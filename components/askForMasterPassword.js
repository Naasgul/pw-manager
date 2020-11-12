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
