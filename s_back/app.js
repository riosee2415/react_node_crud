const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const postRouter = require("./routes/postRouter");

const app = express();
const PORT = 7020;

app.use(morgan(`dev`));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/post", postRouter);

app.listen(PORT, () => {
  console.log(`${PORT} Server Start`);
});
