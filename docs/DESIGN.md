# DESIGN

## Problem

Given a library of images and blog posts,automatically suggest the correct image for each post based on what the image means. False positives or a visually similar but wrong image must not be presented. Suggesting images must require a high confidence score or rating.

## Non-goal

No frontend UI is built. A human reviewer is expected to call them directly or via a tool like Postman/curl, not a web page.

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
3. Sort descending. The top result is the _candidate_ _suggestion_.

### Guard rules

| Check                                                                                             | Outcome if it fails                                                              |
| ------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| Is the candidate `flagged`, or `confidence < 0.6`?                                                | **Rejected** — "Low-confidence classification, not trusted for matching."        |
| Does the post have an expected category, and does it match the candidate's `category`?            | **Rejected** — "Category mismatch: expected X, detected Y."                      |
| Is cosine similarity ≥ threshold (default `0.55`, tuned in Phase 4 against the labeled eval set)? | **No match** — "Best candidate similarity below threshold — no confident match." |
| All three pass                                                                                    | **Accepted** — reason states which category matched and the similarity score     |

---

## Database Design

```
images            (id, filename, url, status, attempts, created_at)
image_metadata    (image_id FK, subject, category, attributes[], caption, confidence, flagged, raw_model_output JSONB)
image_vectors     (image_id FK, vector float[])

posts             (id, title, body)
post_vectors      (post_id FK, vector float[])

suggestions       (id, post_id FK, image_id FK, similarity, guard_result, reason, status, created_at)
eval_set          (post_id FK, correct_image_id FK)
cost_log          (id, call_type, model, image_id, input_tokens, output_tokens, cost_usd, created_at)
```

---

## API surface

```
POST api/images/ingest         # register image rows (url, filename) with status='pending'
POST api/jobs/run-batch        # run the vision batch job over all pending/failed images
GET  api/posts/:id/images      # rank candidates for a post, run the guard, return top-5 + guard decision
POST api/suggestions/:id/approve
POST api/suggestions/:id/reject
GET  api/suggestions/:id       # inspect a suggestion's guard reason
GET  api/eval/run              # compute and return top-1 precision over eval_set
```

## Layer sketch

```
HTTP layer      — Express routes, request validation (Zod), no business logic
Service layer   — classify.ts, batchJob.ts, rank.ts, mismatchGuard.ts — pure/testable, no HTTP concerns
Data layer      — pg pool + parameterized queries, one file per table group under src/db/
```
