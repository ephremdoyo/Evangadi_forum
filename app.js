const express = require("express");
const app = express();
const cors = require("cors");
const userRoutes = require("./routes/userRoute");
const questionsRoute = require("./routes/questionRoute");
const answerRoute = require("./routes/answerRoute");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT;

app.use(cors());
// db connection
const dbConnection = require("./db/dbConfig");

// json middleware to extract json data
app.use(express.json());

// user routes middleware
app.use("/user", userRoutes);

// question routes middleware
app.use("/question", questionsRoute);

// answer routes middleware

app.use("/answer", answerRoute);



app.get("/", (req, res) => {
  res.send("welcome");
});


async function start() {
  try {
    const result = await dbConnection.execute("select 'test'");
    // console.log(result);
    await app.listen(PORT);
    console.log("database connection established");
    console.log(`Listening on http://localhost:${PORT}`);
  } catch (err) {
    console.log(err.message);
  }
}
start();
