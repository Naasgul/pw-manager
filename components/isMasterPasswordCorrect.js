const masterPassword = "123";

function isMasterPasswordCorrect(userInputMasterPassword) {
  if (userInputMasterPassword === masterPassword) {
    return masterPassword;
  } else {
    console.log("Wrong Password");
  }
}

exports.isMasterPasswordCorrect = isMasterPasswordCorrect;
