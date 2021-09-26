import { app } from "./app";
import { db } from "./database/db";

app.listen(process.env.APP_PORT, async () => {
  await db.sync();
  console.log(`Server is running at port ${process.env.APP_PORT}...`);
});
