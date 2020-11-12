const fs = require("fs").promises;
const CryptoJS = require("crypto-js");

async function getPasswordData(passwordName) {
  const promise = await fs.readFile("./db.json", "utf8");
  const data = await JSON.parse(promise);
  const passwordBytes = CryptoJS.AES.decrypt(data[passwordName], "123");
  return passwordBytes.toString(CryptoJS.enc.Utf8);
}

exports.getPasswordData = getPasswordData;
