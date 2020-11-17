require("dotenv").config();
const { request } = require("express");
const express = require("express");

const {
  readData,
  collection,
  connect,
  insertData,
  deleteData,
} = require("./components/databaseCheat");
const app = express();
app.use(express.json());
const port = 3000;

app.get("/api/passwords/:id", async (request, response) => {
  const { id } = request.params;
  try {
    const collectionName = await collection("passwords");
    const passwordValue = await readData(collectionName, id);
    response.send(passwordValue);
  } catch (error) {
    console.error(error);
    response.status(500);
    response.send("Password not found");
  }
});

app.post("/api/passwords", async (request, response) => {
  const password = request.body;
  try {
    const collectionName = await collection("passwords");
    await insertData(collectionName, password.id, password.password);
    response.send("Password set");
  } catch (error) {
    console.error(error);
    return;
  }
});

app.delete("/api/passwords/:id", async (request, response) => {
  const collectionName = await collection("passwords");
  const { id } = request.params;
  const result = await deleteData(collectionName, id);
  if (result.deleteData === 0) {
    return response.status(404).send("Password already deleted");
  } else {
    response.status(200).json(result);
  }
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
