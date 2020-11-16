const { MongoClient } = require("mongodb");
const CryptoJS = require("crypto-js");

//1. connect to MongoDB

let client;
let db;
async function connect(url, dbName) {
  // Use connect method to connect to the Server
  client = await MongoClient.connect(url, { useUnifiedTopology: true });
  db = client.db(dbName);
}

// 2. close connection
function close() {
  return client.close();
}

//3. pick collection in DB
function collection(name) {
  return db.collection(name);
}

//4. read Data from DB
async function readData(db, name) {
  const password = await db.findOne({ id: name });
  const decryptedPassword = await CryptoJS.AES.decrypt(
    password.password,
    process.env.CRYPTO_PW
  );

  return decryptedPassword.toString(CryptoJS.enc.Utf8);
}

//5. Insert data in DB

async function insertData(db, name, pw) {
  const encryptedPw = CryptoJS.AES.encrypt(
    pw,
    process.env.CRYPTO_PW
  ).toString();
  await db
    .insertOne({
      id: name,
      password: encryptedPw,
    })
    .then(function (result) {});
}

//6. Update data in DB

async function updateData(db, passwordName, newValue) {
  await db.updateOne(
    { id: passwordName },
    {
      $set: { password: newValue },
      $currentDate: { lastModified: true },
    }
  );
}

// 7. delete data in DB
async function deleteData(db, id) {
  await db.deleteOne({
    id: id,
  });
}

// 8.

exports.connect = connect;
exports.close = close;
exports.collection = collection;
exports.readData = readData;
exports.insertData = insertData;
exports.updateData = updateData;
exports.deleteData = deleteData;
