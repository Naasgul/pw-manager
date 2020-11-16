require("dotenv").config();
const express = require("express");

const { readData, collection, connect } = require("./components/databaseCheat");
const app = express();
const port = 3000;

app.get("/api/passwords/:id", async (request, response) => {
  const { id } = request.params;
  const collectionName = await collection("passwords");
  const passwordValue = await readData(collectionName, id);
  response.send(passwordValue);
});

app.post("/api/passwords", (request, response) => {
  response.send("Under construction");
});

async function run() {
  console.log("Connecting to database...");
  await connect(process.env.DB_URL, process.env.DB_NAME);
  console.log("Connected to database 🎉");

  app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
  });
}

run();
