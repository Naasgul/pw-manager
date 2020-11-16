const inquirer = require("inquirer");

async function askForMasterPassword() {
  const { masterPassword } = await inquirer.prompt({
    type: "password",
    mask: "*",
    name: "masterPassword",
    message: "Enter the master password :",
  });
  return masterPassword;
}

exports.askForMasterPassword = askForMasterPassword;

async function askForAction() {
  const { chosenAction } = await inquirer.prompt({
    type: "list",
    choices: ["read", "update", "delete"],
    name: "chosenAction",
    message: "What would you like to do?",
  });
  return chosenAction;
}

exports.askForAction = askForAction;

async function askForNewValue() {
  const { newValue } = await inquirer.prompt({
    type: "input",

    name: "newValue",
    message: "Enter the new password:",
  });
  return newValue;
}
exports.askForNewValue = askForNewValue;

async function askForNewPassword() {
  const { newPassword } = await inquirer.prompt({
    type: "input",

    name: "newPassword",
    message: "Enter the new value:",
  });
  return newPassword;
}
exports.askForNewPassword = askForNewPassword;

async function askForAddOrModify() {
  const { newValue } = await inquirer.prompt({
    type: "list",
    choices: ["Add", "modify"],
    name: "newValue",
    message: "Would you like to add a new password or modify an existing one?",
  });
  return newValue;
}
exports.askForAddOrModify = askForAddOrModify;
