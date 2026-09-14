# DESIGN

## Problem

Given a library of images and blog posts, automatically suggest the correct image for each post based on what the image means. False positives or a visually similar but wrong image must not be presented. Suggesting images must require a high confidence score or rating.

## Non-goal

No frontend UI is built. A human reviewer is expected to call endpoints directly or via a tool like Postman/curl, not a web page.

---

## Image Metadata Schema

```json
{
  "subject": "red fox",
  "category": "animal",
  "attributes": ["orange fur", "wild", "forest"],
  "caption": "A red fox standing in a forest",
  "confidence": 0.94
}
```

| Field        | Type       | Description                                                                                    |
| ------------ | ---------- | ---------------------------------------------------------------------------------------------- |
| `subject`    | string     | The specific thing in the image                                                                |
| `category`   | string     | Much more general categorizer so the guard can use it to narrow down similarities.             |
| `attributes` | string[]   | 1–8 descriptive tags that act as supporting detail only                                        |
| `caption`    | string     | One-sentence description — this is what actually gets embedded and compared against post text. |
| `confidence` | number 0–1 | The model's own certainty in `subject`/`category`.                                             |

---

## Matching strategy + Guard Rules

### Matching strategy

1. Embed every image's `caption` and every post's `title + body` into the same vector space.
2. For a given post, compute cosine similarity between the post vector and every image vector.
3. Sort descending. Return the top-5 as ranked candidates.

### Guard rules

| Check                                                                                             | Outcome if it fails                                                              |
| ------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| Is the candidate `flagged`, or `confidence < 0.6`?                                                | **Rejected** — "Low-confidence classification, not trusted for matching."        |
| Does the post have an expected category, and does it match the candidate's `category`?            | **Rejected** — "Category mismatch: expected X, detected Y."                      |
| Is cosine similarity ≥ threshold (default `0.55`, tuned in Phase 4 against the labeled eval set)? | **No match** — "Best candidate similarity below threshold — no confident match." |
| No candidate images exist at all                                                                  | **No match** — returned directly, not treated as a guard failure                 |
| All checks pass                                                                                   | **Accepted** — reason states which category matched and the similarity score     |

---

## Database Design

```
images            (id, filename, url, status, attempts, created_at)
image_metadata    (image_id FK, subject, category, attributes[], caption, confidence, flagged, raw_model_output JSONB)
image_vectors     (image_id FK, vector real[])

posts             (id, title, body, expected_category)
post_vectors      (post_id FK, vector real[])

suggestions       (id, post_id FK, image_id FK, similarity, guard_result, reason, status, created_at,
                    UNIQUE(post_id, image_id))

eval_set          (post_id FK, expected_category, UNIQUE(post_id, expected_category))
cost_log          (id, call_type, model, image_id, input_tokens, output_tokens, cost_usd, created_at)
```

**Notes:**

- `posts.expected_category` stores the ground-truth category a post's matched image should belong to, when known. Used by the mismatch guard's category check.
- `eval_set` tracks **post → expected category**, not post → expected image. Multiple images can legitimately match one post's category, so precision is measured at the category level rather than requiring an exact image match. Eval pairs are hand-labeled by a human, independent of what the classifier tags — using the classifier's own output as ground truth would just measure self-agreement.
- `suggestions` has a unique constraint on `(post_id, image_id)` so repeated `GET /api/posts/:id/images` calls upsert the existing suggestion rather than inserting duplicate rows on every call.
- `image_metadata.category` is indexed since the guard filters/compares on it per request.

---

## API surface

```
GET   /                            # API info
GET   /health                      # API status

POST  /api/posts/                  # create a post, embed it, store post_vector
GET   /api/posts/:id/images        # rank candidates for a post, run the guard, return top-5 + guard decision

GET   /api/suggestions/:id         # inspect a suggestion's guard reason
PATCH /api/suggestions/:id/approve
PATCH /api/suggestions/:id/reject

POST  /api/eval                    # add evaluation pairs (post_id, expected_category) to eval_set
GET   /api/eval                    # compute and return precision over eval_set
```

Image ingestion and classification run as a batch process against the `images`/`image_metadata` tables (see `helpers/fetch-images.ts`, `helpers/classify-fetched.ts`, `helpers/embed-fetched.ts`) rather than through a dedicated ingest/batch-job API — there is no `POST /api/images/ingest` or `POST /api/jobs/run-batch` endpoint.

## Layer sketch

```
HTTP layer      — Express routes, request validation (Zod), no business logic
Service layer   — posts.service.ts, eval.service.ts — pure/testable, no HTTP concerns
AI layer        — classify.ts, embed.ts, mismatch-guard.ts, cosine-similarity.ts
Helpers layer   — fetch-images.ts, classify-fetched.ts, embed-fetched.ts, cost-log.ts (batch/background work)
Data layer      — pg pool + parameterized queries, schema defined in init-db.ts
```
