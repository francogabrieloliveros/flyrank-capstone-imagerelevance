import app from "@/app";
import config from "@/config";
import initializeDatabase from "@/db/init-db";
import fetchImages from "@/helpers/fetch-images";
import embedFetched from "@/helpers/embed-fetched";
import classifyFetched from "@/helpers/classify-fetched";

async function bootstrap() {
  await initializeDatabase();
  await fetchImages();
  await classifyFetched();
  await embedFetched();

  app.listen(config.port, () => {
    console.log(`App listening on port ${config.port}...`);
  });
}

bootstrap().catch((err) => {
  console.error("Startup failed:", err);
  process.exit(1);
});
