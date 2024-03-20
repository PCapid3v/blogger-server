import cors from "cors";
import express from "express";
import morgan from "morgan";
import userRouter from "./router/user.js"
import postRouter from "./router/post.js";

const app = express();
app.disable("x-powered-by");
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import "dotenv/config";

app.use("/users", userRouter);

app.use("/posts", postRouter);



app.get("*", (req, res) => {
  res.status(404).json({
    status: "fail",
    data: {
      resource: "Not found",
    },
  });
});

export default app;
