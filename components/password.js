const fs = require("fs").promises;
const CryptoJS = require("crypto-js");
const inquirer = require("inquirer");

async function getAllPasswords() {
  const promise = await fs.readFile("./db.json", "utf8");
  const data = await JSON.parse(promise);
  return data;
}

async function getPasswordData(passwordName) {
  const data = await getAllPasswords();
  const passwordBytes = CryptoJS.AES.decrypt(data[passwordName], "123");
  return passwordBytes.toString(CryptoJS.enc.Utf8);
}

async function askForPasswordInSafe() {
  const { chosenPassword } = await inquirer.prompt({
    type: "input",

    name: "chosenPassword",
    message: "What password would you like to get/modify?",
  });
  return chosenPassword;
}

async function setPassword(newPassword) {
  passwordSafe[passwordName] = CryptoJS.AES.encrypt(
    newPasswordValue,
    await getMasterPassword()
  ).toString();
  fs.writeFile("./db.json", JSON.stringify(passwordSafe, null, 2));
  console.log("Your password was changed successfully");
}

exports.askForPasswordInSafe = askForPasswordInSafe;

exports.getPasswordData = getPasswordData;

exports.getAllPasswords = getAllPasswords;

exports.setPassword = setPassword;
