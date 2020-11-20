/* const fs = require("fs").promises;

async function getMasterPassword() {
  return await fs.readFile("../.masterPassword", "utf8");
}

function () {
  
}

exports.getMasterPassword = getMasterPassword;
 */

function getMasterPassword() {
  return process.env.MASTER_PASSWORD;
}

exports.getMasterPassword = getMasterPassword;
