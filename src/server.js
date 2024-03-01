import cors from "cors";
import express from "express";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import "dotenv/config";

app.get("*", (req, res) => {
  res.status(404).json({
    status: "fail",
    data: {
      resource: "Not found",
    },
  });
});

export default app;
