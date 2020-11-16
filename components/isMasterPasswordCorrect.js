const { getMasterPassword } = require("./getMasterPassword");

async function isMasterPasswordCorrect(userInputMasterPassword) {
  return userInputMasterPassword === (await getMasterPassword());
}

exports.isMasterPasswordCorrect = isMasterPasswordCorrect;
