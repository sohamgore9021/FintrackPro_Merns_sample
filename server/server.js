import app from "./src/app.js";
import { config } from "./src/config/config.js";
import { connectDb } from "./src/config/db.js";

await connectDb()

app.listen(config.PORT, () => {
  console.log("server is running");
});
