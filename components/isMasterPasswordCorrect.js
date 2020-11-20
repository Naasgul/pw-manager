const { getMasterPassword } = require("./getMasterPassword");

async function isMasterPasswordCorrect(userInputMasterPassword) {
  return userInputMasterPassword === getMasterPassword();
}

exports.isMasterPasswordCorrect = isMasterPasswordCorrect;
