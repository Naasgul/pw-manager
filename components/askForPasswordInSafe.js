const inquirer = require("inquirer");

async function askForPasswordInSafe() {
  const { chosenPassword } = await inquirer.prompt({
    type: "input",

    name: "chosenPassword",
    message: "What password would you like to get/modify?",
  });
  return chosenPassword;
}

exports.askForPasswordInSafe = askForPasswordInSafe;
