import app from "@/app";
import config from "@/config";
import initializeDatabase from "@/db/init-db";
import main from "@/helpers/fetch-images";

async function bootstrap() {
  await initializeDatabase();

  await main();

  app.listen(config.port, () => {
    console.log(`App listening on port ${config.port}...`);
  });
}

bootstrap().catch((err) => {
  console.error("Startup failed:", err);
  process.exit(1);
});
