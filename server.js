import express from "express";
import routes from "./src/routes/postsRoutes.js";

const app = express();
const port = 3000;
routes(app);

app.listen(port, () => {
  console.log(`Server Listening on port ${port}`);
});
