const fs = require("fs").promises;

async function getMasterPassword() {
  return await fs.readFile("../.masterPassword", "utf8");
}

exports.getMasterPassword = getMasterPassword;
