const config = {
  openRouterApiKey: process.env.OPENROUTER_API_KEY,
  visionModel: process.env.VISION_MODEL,
  embedModel: process.env.EMBED_MODEL,
  databaseUrl: process.env.DATABASE_URL,
  port: Number(process.env.PORT ?? 3000),
};

export default config;
