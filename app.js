const { askForMasterPassword } = require("./components/askForMasterPassword");
const {
  isMasterPasswordCorrect,
} = require("./components/isMasterPasswordCorrect");
const { askForPasswordInSafe } = require("./components/askForPasswordInSafe");
const { getPasswordData } = require("./components/getPasswordData");
const inquirer = require("inquirer");
const CryptoJS = require("crypto-js");
const fs = require("fs").promises;

async function runPasswordManager() {
  const userInputMasterPassword = await askForMasterPassword();
  if (!isMasterPasswordCorrect(userInputMasterPassword)) {
    runPasswordManager();
  }

  console.log("Correct Password");

  const args = process.argv.slice(2);
  const passwordName = args[0];
  const newPasswordValue = args[1];

  /*  const chosenPassword = await askForPasswordInSafe(); */
  if (passwordName) {
    const passwordSafe = getPasswordData(passwordName);
    if (newPasswordValue) {
      passwordSafe[passwordName] = CryptoJS.AES.encrypt(
        newPasswordValue,
        "123"
      ).toString();

      fs.writeFile("./db.json", JSON.stringify(passwordSafe, null, 2));
      console.log("Your password was changed successfully");
    } else {
      const passwordData = await getPasswordData(passwordName);
      console.log(passwordData);
    }
  } else {
    console.log("Password not found!");
  }
}

runPasswordManager();

/* const inquirer = require("inquirer");

  if (masterPassword === answers.password) {
    console.log(`Correct Password, ${answers.name} `);
  } else {
    console.log(`Wrong Password`);
  }

const args = process.argv.slice(2);

const passwordName = args[0];

const masterPassword = "Test";

const fs = require("fs").promises;

async function getData() {
  const promise = await fs.readFile("./db.json", "utf8");
  const data = await JSON.parse(promise);
  return data;
}

const questions = [
  {
    type: "input",
    name: "name",
    message: "What's your name?",
  },
  {
    type: "checkbox",
    name: "mood",
    message: "How are you doing?",
    choices: ["good", "bad"],
  },
  {
    type: "password",
    mask: "*",
    name: "password",
    message: "Enter your password:",
  },
];

async function validateAccess() {
  const answers = await inquirer.prompt(questions);
  const passwordSafe = await getData();

  if (answers.mood.includes("good")) {
    console.log(`Very good, ${answers.name} `);
  } else if (answers.mood.includes("bad")) {
    console.log(`I'm sorry, ${answers.name}`);
  }

  if (masterPassword === answers.password) {
    console.log(`Correct Password, ${answers.name} `);
  } else {
    console.log(`Wrong Password`);
  }
  const args = process.argv.slice(2);
  const passwordName = args[0];
  const newPasswordValue = args[1];

  if (newPasswordValue) {
    passwordSafe[passwordName] = newPasswordValue;
    fs.writeFile("./db.json", JSON.stringify(passwordSafe, null, 2));
    console.log("Your password was changed successfully");
  } else {
    const password = passwordSafe[passwordName];
    if (password) {
      console.log(`${passwordName}: ${password}`);
    } else {
      console.log(`Password not found, ${answers.name}`);
    }
  }
}

validateAccess();
 */
