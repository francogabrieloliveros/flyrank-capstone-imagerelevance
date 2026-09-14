## RUN 1 + AUTOMATED SEED & TESTS

```bash
Container flyrank-capstone-imagerelevance-db-1 Healthy
api-1  |
api-1  | > flyrank-capstone-imagerelevance@1.0.0 dev
api-1  | > tsx watch --env-file=.env index.ts
api-1  |
api-1  |
api-1  | Database initialized successfully.
api-1  |
api-1  | Searching "red fox"...
api-1  |   downloading 001-red-fox-xUUZcpQlqpM.jpg
api-1  |   downloading 002-red-fox-nOsJYzXEG98.jpg
api-1  |   downloading 003-red-fox-BNR4sS2LA10.jpg
api-1  |   downloading 004-red-fox-OVWn1sbGIYQ.jpg
api-1  |   downloading 005-red-fox-Wstln0400pE.jpg
api-1  |   downloading 006-red-fox-e4ING8JYKgI.jpg
api-1  |   downloading 007-red-fox-fOV7nWWIwRk.jpg
api-1  |   downloading 008-red-fox-lRwGMe1MFj4.jpg
api-1  |   downloading 009-red-fox-_RnbxS6vUb8.jpg
api-1  |   downloading 010-red-fox-qQUtvVdurHg.jpg
api-1  | Searching "gray wolf"...
api-1  |   downloading 011-gray-wolf-1AIYdIb3O5M.jpg
api-1  |   downloading 012-gray-wolf-mblYxasm0nk.jpg
api-1  |   downloading 013-gray-wolf-e9hbo4NtKJ0.jpg
api-1  |   downloading 014-gray-wolf-9y-XkkOk2XI.jpg
api-1  |   downloading 015-gray-wolf-kR1Aer8c_WI.jpg
api-1  |   downloading 016-gray-wolf-rRgUtMpM1uw.jpg
api-1  |   downloading 017-gray-wolf-FFAPycbKC7A.jpg
api-1  |   downloading 018-gray-wolf-jGip_U1fXTI.jpg
api-1  |   downloading 019-gray-wolf-ghtTSfjSBoE.jpg
api-1  |   downloading 020-gray-wolf-hOGzDomlbIY.jpg
api-1  | Searching "dog"...
api-1  |   downloading 021-dog-N04FIfHhv_k.jpg
api-1  |   downloading 022-dog-qO-PIF84Vxg.jpg
api-1  |   downloading 023-dog-2l0CWTpcChI.jpg
api-1  |   downloading 024-dog-T-0EW-SEbsE.jpg
api-1  |   downloading 025-dog-U3aF7hgUSrk.jpg
api-1  |   downloading 026-dog-v3-zcCWMjgM.jpg
api-1  |   downloading 027-dog-UtrE5DcgEyg.jpg
api-1  |   downloading 028-dog-NH1d0xX6Ldk.jpg
api-1  |   downloading 029-dog-1QsQRkxnU6I.jpg
api-1  |   downloading 030-dog-2_3c4dIFYFU.jpg
api-1  | Searching "bear"...
api-1  |   downloading 031-bear-qQWV91TTBrE.jpg
api-1  |   downloading 032-bear-y421kXlUOQk.jpg
api-1  |   downloading 033-bear-_QG2C0q6J-s.jpg
api-1  |   downloading 034-bear-_r6w0R6SueQ.jpg
api-1  |   downloading 035-bear-rGPDLlMNFF4.jpg
api-1  |   downloading 036-bear-Ec_ygZTIv_0.jpg
api-1  |   downloading 037-bear-Pt3asvL65Mg.jpg
api-1  |   downloading 038-bear-KgRKlQXmHR0.jpg
api-1  |   downloading 039-bear-kZ8dyUT0h30.jpg
api-1  |   downloading 040-bear-ypS9j3UzqLk.jpg
api-1  | Searching "deer"...
api-1  |   downloading 041-deer-favQn8WgRyk.jpg
api-1  |   downloading 042-deer-FGkNt8tO04I.jpg
api-1  |   downloading 043-deer-B8xmtKWLrVo.jpg
api-1  |   downloading 044-deer-NIyqowE5aDE.jpg
api-1  |   downloading 045-deer-wHdFa4F1zRA.jpg
api-1  |   downloading 046-deer-c4WBrQGR5q0.jpg
api-1  |   downloading 047-deer-d5l17dc_lxU.jpg
api-1  |   downloading 048-deer-5RY9GtjPXZM.jpg
api-1  |   downloading 049-deer-1tsAbBciTic.jpg
api-1  |   downloading 050-deer-vmlJcey6HEU.jpg
api-1  |
api-1  | Done. 50 images written to /app/data/images.
api-1  |
api-1  | Done. 50 entries written to database.
api-1  |
api-1  | Classifying fetched images.
api-1  |    [classifyImage] image 1: success
api-1  |    [classifyImage] image 2: success
api-1  |    [classifyImage] image 3: success
api-1  |    [classifyImage] image 4: success
api-1  |    [classifyImage] image 5: success
api-1  |    [classifyImage] image 6: success
api-1  |    [classifyImage] image 7: success
api-1  |    [classifyImage] image 8: success
api-1  |    [classifyImage] image 9: success
api-1  |    [classifyImage] image 10: success
api-1  |    [classifyImage] image 11: success
api-1  |    [classifyImage] image 12: success
api-1  |    [classifyImage] image 13: success
api-1  |    [classifyImage] image 14: success
api-1  |    [classifyImage] image 15: success
api-1  |    [classifyImage] image 16: success
api-1  |    [classifyImage] image 17: success
api-1  |    [classifyImage] image 18: success
api-1  |    [classifyImage] image 19: success
api-1  |    [classifyImage] image 20: success
api-1  |    [classifyImage] image 21: success
api-1  |    [classifyImage] image 22: success
api-1  |    [classifyImage] image 23: success
api-1  |    [classifyImage] image 24: success
api-1  |    [classifyImage] image 25: success
api-1  |    [classifyImage] image 26: success
api-1  |    [classifyImage] image 27: success
api-1  |    [classifyImage] image 28: success
api-1  |    [classifyImage] image 29: success
api-1  |    [classifyImage] image 30: success
api-1  |    [classifyImage] image 31: success
api-1  |    [classifyImage] image 32: success
api-1  |    [classifyImage] image 33: success
api-1  |    [classifyImage] image 34: success
api-1  |    [classifyImage] image 35: success
api-1  |    [classifyImage] image 36: success
api-1  |    [classifyImage] image 37: success
api-1  |    [classifyImage] image 38: success
api-1  |    [classifyImage] image 39: success
api-1  |    [classifyImage] image 40: success
api-1  |    [classifyImage] image 41: success
api-1  |    [classifyImage] image 42: success
api-1  |    [classifyImage] image 43: success
api-1  |    [classifyImage] image 44: success
api-1  |    [classifyImage] image 45: success
api-1  |    [classifyImage] image 46: success
api-1  |    [classifyImage] image 47: success
api-1  |    [classifyImage] image 48: success
api-1  |    [classifyImage] image 49: success
api-1  |    [classifyImage] image 50: success
api-1  | Done. 50 images classfied. 0 failed.
api-1  |
api-1  | Embedding fetched images...
api-1  |    [embedImage] image 1: success
api-1  |    [embedImage] image 2: success
api-1  |    [embedImage] image 3: success
api-1  |    [embedImage] image 4: success
api-1  |    [embedImage] image 5: success
api-1  |    [embedImage] image 6: success
api-1  |    [embedImage] image 7: success
api-1  |    [embedImage] image 8: success
api-1  |    [embedImage] image 9: success
api-1  |    [embedImage] image 10: success
api-1  |    [embedImage] image 11: success
api-1  |    [embedImage] image 12: success
api-1  |    [embedImage] image 13: success
api-1  |    [embedImage] image 14: success
api-1  |    [embedImage] image 15: success
api-1  |    [embedImage] image 16: success
api-1  |    [embedImage] image 17: success
api-1  |    [embedImage] image 18: success
api-1  |    [embedImage] image 19: success
api-1  |    [embedImage] image 20: success
api-1  |    [embedImage] image 21: success
api-1  |    [embedImage] image 22: success
api-1  |    [embedImage] image 23: success
api-1  |    [embedImage] image 24: success
api-1  |    [embedImage] image 25: success
api-1  |    [embedImage] image 26: success
api-1  |    [embedImage] image 27: success
api-1  |    [embedImage] image 28: success
api-1  |    [embedImage] image 29: success
api-1  |    [embedImage] image 30: success
api-1  |    [embedImage] image 31: success
api-1  |    [embedImage] image 32: success
api-1  |    [embedImage] image 33: success
api-1  |    [embedImage] image 34: success
api-1  |    [embedImage] image 35: success
api-1  |    [embedImage] image 36: success
api-1  |    [embedImage] image 37: success
api-1  |    [embedImage] image 38: success
api-1  |    [embedImage] image 39: success
api-1  |    [embedImage] image 40: success
api-1  |    [embedImage] image 41: success
api-1  |    [embedImage] image 42: success
api-1  |    [embedImage] image 43: success
api-1  |    [embedImage] image 44: success
api-1  |    [embedImage] image 45: success
api-1  |    [embedImage] image 46: success
api-1  |    [embedImage] image 47: success
api-1  |    [embedImage] image 48: success
api-1  |    [embedImage] image 49: success
api-1  |    [embedImage] image 50: success
api-1  | Done. 50 images embedded. 0 failed.
api-1  |
api-1  | App listening on port 3000...

□ flyrank-capstone-imagerelevance △◎ npm run seed

> flyrank-capstone-imagerelevance@1.0.0 seed
> tsx scripts/seed.ts

Seeding 10 eval posts against http://localhost:3000...
  created post #1 (expected: accepted)
  created post #2 (expected: accepted)
  created post #3 (expected: rejected)
  created post #4 (expected: rejected)
  created post #5 (expected: rejected)
  created post #6 (expected: no_match)
  created post #7 (expected: no_match)
  created post #8 (expected: rejected)
  created post #9 (expected: accepted)
  created post #10 (expected: rejected)
Added 10 eval pairs.

□ flyrank-capstone-imagerelevance △◎ npm run test

> flyrank-capstone-imagerelevance@1.0.0 test
> tsx scripts/test.ts

{
  "success": true,
  "message": "Evaluation complete.",
  "data": {
    "precision": 0.7,
    "total": 10,
    "correct": 7,
    "details": [
      {
        "post_id": 1,
        "expected_category": "accepted",
        "predicted_category": "rejected",
        "matched": false
      },
      {
        "post_id": 2,
        "expected_category": "accepted",
        "predicted_category": "rejected",
        "matched": false
      },
      {
        "post_id": 3,
        "expected_category": "rejected",
        "predicted_category": "rejected",
        "matched": true
      },
      {
        "post_id": 4,
        "expected_category": "rejected",
        "predicted_category": "rejected",
        "matched": true
      },
      {
        "post_id": 5,
        "expected_category": "rejected",
        "predicted_category": "rejected",
        "matched": true
      },
      {
        "post_id": 6,
        "expected_category": "no_match",
        "predicted_category": "no_match",
        "matched": true
      },
      {
        "post_id": 7,
        "expected_category": "no_match",
        "predicted_category": "no_match",
        "matched": true
      },
      {
        "post_id": 8,
        "expected_category": "rejected",
        "predicted_category": "rejected",
        "matched": true
      },
      {
        "post_id": 9,
        "expected_category": "accepted",
        "predicted_category": "rejected",
        "matched": false
      },
      {
        "post_id": 10,
        "expected_category": "rejected",
        "predicted_category": "rejected",
        "matched": true
      }
    ]
  }
}

```

## RUN 2 + AUTOMATED SEED & TESTS

```bash
Container flyrank-capstone-imagerelevance-db-1 Healthy
api-1  |
api-1  | > flyrank-capstone-imagerelevance@1.0.0 dev
api-1  | > tsx watch --env-file=.env index.ts
api-1  |
api-1  | Database initialized successfully.
api-1  |
api-1  | Found 50 existing images, skipping fetch.
api-1  |
api-1  | No pending images found. Skipping embedding.
api-1  |
api-1  | Embedding fetched images...
api-1  | No unembedded image found. Skipped.
api-1  |
api-1  | App listening on port 3000...

□ flyrank-capstone-imagerelevance △◎ npm run seed

> flyrank-capstone-imagerelevance@1.0.0 seed
> tsx scripts/seed.ts

Seeding 10 eval posts against http://localhost:3000...
  created post #1 (expected: accepted)
  created post #2 (expected: accepted)
  created post #3 (expected: rejected)
  created post #4 (expected: rejected)
  created post #5 (expected: rejected)
  created post #6 (expected: no_match)
  created post #7 (expected: no_match)
  created post #8 (expected: rejected)
  created post #9 (expected: accepted)
  created post #10 (expected: rejected)
Added 10 eval pairs.

□ flyrank-capstone-imagerelevance △◎ npm run test

> flyrank-capstone-imagerelevance@1.0.0 test
> tsx scripts/test.ts

{
  "success": true,
  "message": "Evaluation complete.",
  "data": {
    "precision": 0.7,
    "total": 10,
    "correct": 7,
    "details": [
      {
        "post_id": 1,
        "expected_category": "accepted",
        "predicted_category": "rejected",
        "matched": false
      },
      {
        "post_id": 2,
        "expected_category": "accepted",
        "predicted_category": "rejected",
        "matched": false
      },
      {
        "post_id": 3,
        "expected_category": "rejected",
        "predicted_category": "rejected",
        "matched": true
      },
      {
        "post_id": 4,
        "expected_category": "rejected",
        "predicted_category": "rejected",
        "matched": true
      },
      {
        "post_id": 5,
        "expected_category": "rejected",
        "predicted_category": "rejected",
        "matched": true
      },
      {
        "post_id": 6,
        "expected_category": "no_match",
        "predicted_category": "no_match",
        "matched": true
      },
      {
        "post_id": 7,
        "expected_category": "no_match",
        "predicted_category": "no_match",
        "matched": true
      },
      {
        "post_id": 8,
        "expected_category": "rejected",
        "predicted_category": "rejected",
        "matched": true
      },
      {
        "post_id": 9,
        "expected_category": "accepted",
        "predicted_category": "rejected",
        "matched": false
      },
      {
        "post_id": 10,
        "expected_category": "rejected",
        "predicted_category": "rejected",
        "matched": true
      }
    ]
  }
}
```

# Sample Curl Commands

## `GET /`

```bash
# good
curl http://localhost:3000/

{"name":"image-tagger-api","version":"1.0","endpoints":["GET /","GET /health","POST /api/posts/","GET /api/posts/:id/images","GET /api/suggestions/:id","PATCH /api/suggestions/:id/approve","PATCH /api/suggestions/:id/reject","POST /api/eval","GET /api/eval"]}
```

```bash
# bad — wrong method, should 404
curl -X POST http://localhost:3000/

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Error</title>
</head>
<body>
<pre>Cannot POST /</pre>
</body>
</html>
```

---

## `GET /health`

```bash
# good
curl http://localhost:3000/health

{"status":"ok"}
```

```bash
# bad — trailing garbage path, should 404
curl http://localhost:3000/health/nonsense

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Error</title>
</head>
<body>
<pre>Cannot GET /health/nonsense</pre>
</body>
</html>
```

---

## `POST /api/posts/`

```bash
# good
curl -X POST http://localhost:3000/api/posts/ \
  -H "Content-Type: application/json" \
  -d '{"title":"A Morning in the Forest","body":"A red fox trots silently through fresh snow.","expectedCategory":"animal"}'

{"success":true,"message":"Post embedded to the database.","data":{"post_id":1,"vector":[-0.009567261,-0.027709961,0.03845215, ...]}}
```

```bash
# bad — missing required "body" field, should 400 per createPostSchema, not 500
curl -i -X POST http://localhost:3000/api/posts/ \
  -H "Content-Type: application/json" \
  -d '{"title":"Missing body field"}'

HTTP/1.1 400 Bad Request
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 152
ETag: W/"98-/7H7/3TRggU1Mvhm7InT88l9S0Q"
Date: Mon, 14 Sep 2026 05:54:02 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"success":false,"message":"Validation failed","errors":{"formErrors":[],"fieldErrors":{"body":["Invalid input: expected string, received undefined"]}}}
```

---

## `GET /api/posts/:id/images`

```bash
# good
curl http://localhost:3000/api/posts/1/images

{"success":true,"message":"Fetched similar images to post.","data":{"suggestion":{"suggestion_id":11,"subject":"red fox","category":"animal","result":"accepted","reason":"Category \"animal\" matched with similarity 0.61373732862022."},"ranked_images":[{"imageId":6,"subject":"red fox","category":"animal","confidence":0.98,"flagged":false,"similarity":0.61373732862022},{"imageId":8,"subject":"red fox","category":"animal","confidence":0.98,"flagged":false,"similarity":0.5665540389802586},{"imageId":1,"subject":"red fox","category":"animal","confidence":0.99,"flagged":false,"similarity":0.5482639802791591},{"imageId":5,"subject":"red fox","category":"animal","confidence":0.98,"flagged":false,"similarity":0.5470512250337164},{"imageId":7,"subject":"red fox","category":"animal","confidence":0.98,"flagged":false,"similarity":0.529940006616303}]}}⏎
```

```bash
# bad — non-numeric id, should 400 per postIdParamSchema regex, not crash on a DB query
curl -i http://localhost:3000/api/posts/abc/images

HTTP/1.1 400 Bad Request
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 123
ETag: W/"7b-Q7hugMybgYAVtNIHAJ4GAsOVLNA"
Date: Mon, 14 Sep 2026 06:01:03 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"success":false,"message":"Validation failed","errors":{"formErrors":[],"fieldErrors":{"params":["ID must be a number"]}}}
```

---

## `GET /api/suggestions/:id`

```bash
# good
curl http://localhost:3000/api/suggestions/1

{"success":true,"message":"Fetched suggestions.","data":{"id":1,"post_id":1,"image_id":6,"similarity":0.61373734,"guard_result":"accepted","reason":"Category \"animal\" matched with similarity 0.61373732862022.","status":"pending","created_at":"2026-09-14T05:56:10.252Z"}}
```

```bash
# bad — valid format but nonexistent id, should 404 not 500
curl http://localhost:3000/api/suggestions/999999

{"success":false,"message":"Not found.","data":[]}
```

---

## `PATCH /api/suggestions/:id/approve`

```bash
# good
curl -X PATCH http://localhost:3000/api/suggestions/1/approve

{"success":true,"message":"Approved suggestion.","data":{"id":1,"post_id":1,"image_id":6,"similarity":0.61373734,"guard_result":"accepted","reason":"Category \"animal\" matched with similarity 0.61373732862022.","status":"approved","created_at":"2026-09-14T05:56:10.252Z"}}
```

```bash
# bad — nonexistent suggestion id, should 404
curl -X PATCH http://localhost:3000/api/suggestions/999999/approve

{"success":false,"message":"Not found.","data":[]}
```

---

## `PATCH /api/suggestions/:id/reject`

```bash
# good
curl -X PATCH http://localhost:3000/api/suggestions/1/reject

{"success":true,"message":"Rejected suggestion.","data":{"id":11,"post_id":11,"image_id":6,"similarity":0.61373734,"guard_result":"accepted","reason":"Category \"animal\" matched with similarity 0.61373732862022.","status":"rejected","created_at":"2026-09-14T05:56:10.252Z"}}
```

```bash
# bad — non-numeric id, should 400 per the shared postIdParamSchema
curl -X PATCH http://localhost:3000/api/suggestions/xyz/reject

{"success":false,"message":"Validation failed","errors":{"formErrors":[],"fieldErrors":{"params":["ID must be a number"]}}}
```

---

## `POST /api/eval`

```bash
# good
curl -X POST http://localhost:3000/api/eval \
  -H "Content-Type: application/json" \
  -d '{"eval_set":[{"post_id":1,"expected_category":"animal"}]}'

{"success":true,"message":"Evaluation complete.","data":[{"post_id":1,"expected_category":"accepted"}]}
```

```bash
# bad — empty array, should 400 per postEvalSetSchema's .min(1)
curl -X POST http://localhost:3000/api/eval \
  -H "Content-Type: application/json" \
  -d '{"eval_set":[]}'

{"success":false,"message":"Validation failed","errors":{"formErrors":[],"fieldErrors":{"body":["Evaluation set required."]}}}
```

---

## `GET /api/eval`

```bash
# good
curl http://localhost:3000/api/eval

{"success":true,"message":"Evaluation complete.","data":{"precision":1,"total":1,"correct":1,"details":[{"post_id":1,"expected_category":"accepted","predicted_category":"accepted","matched":true}]}}
```

```bash
# bad — no malformed-request variant applies here; the meaningful "bad" case
# is a state problem, not a request problem: calling this against a freshly
# reset/unseeded DB and confirming it returns a clean response (e.g.
# precision: null or a message) rather than NaN or a crash
curl http://localhost:3000/api/eval

{"success":true,"message":"Evaluation complete.","data":{"precision":null,"total":0,"correct":0,"details":[]}}
```

---
