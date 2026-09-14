import { pool } from "./client";

const initalizeDatabase = async () => {
  const SCHEMA_SQL = `
  CREATE TABLE IF NOT EXISTS images (
    id SERIAL PRIMARY KEY,
    filename TEXT NOT NULL UNIQUE,
    url TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    attempts INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now()
  );

  CREATE TABLE IF NOT EXISTS image_metadata (
    image_id INT PRIMARY KEY REFERENCES images(id) ON DELETE CASCADE,
    subject TEXT NOT NULL,
    category TEXT NOT NULL,
    attributes TEXT[] NOT NULL,
    caption TEXT NOT NULL,
    confidence REAL NOT NULL,
    flagged BOOLEAN NOT NULL DEFAULT false,
    raw_model_output JSONB NOT NULL
  );

  CREATE INDEX IF NOT EXISTS idx_image_metadata_category ON image_metadata(category);

  CREATE TABLE IF NOT EXISTS image_vectors (
    image_id INT PRIMARY KEY REFERENCES images(id) ON DELETE CASCADE,
    vector REAL[] NOT NULL
  );

  CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    expected_category TEXT
  );

  CREATE TABLE IF NOT EXISTS post_vectors (
    post_id INT PRIMARY KEY REFERENCES posts(id) ON DELETE CASCADE,
    vector REAL[] NOT NULL
  );

  CREATE TABLE IF NOT EXISTS suggestions (
    id SERIAL PRIMARY KEY,
    post_id INT REFERENCES posts(id) ON DELETE CASCADE,
    image_id INT REFERENCES images(id) ON DELETE CASCADE,
    similarity REAL NOT NULL,
    guard_result TEXT NOT NULL,
    reason TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE (post_id, image_id)
  );

  CREATE INDEX IF NOT EXISTS idx_suggestions_post ON suggestions(post_id);

  CREATE TABLE IF NOT EXISTS cost_log (
    id SERIAL PRIMARY KEY,
    call_type TEXT NOT NULL,
    model TEXT NOT NULL,
    image_id INT REFERENCES images(id) ON DELETE SET NULL,
    input_tokens INT,
    output_tokens INT,
    cost_usd NUMERIC(10,6) NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now()
  );

  CREATE TABLE IF NOT EXISTS eval_set (
      post_id INT REFERENCES posts(id) ON DELETE CASCADE,
      expected_category TEXT NOT NULL,
      UNIQUE (post_id, expected_category)
  );
  `;

  try {
    await pool.query(SCHEMA_SQL);
    console.log("\nDatabase initialized successfully.\n");
  } catch (error) {
    console.error("\nFailed to initialize database:\n", error);
    process.exit(1);
  }
};
export default initalizeDatabase;
