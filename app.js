require("dotenv").config();
const {
  readData,
  collection,
  connect,
  updateData,
  deleteData,
  close,
  insertData,
} = require("./components/databaseCheat");
const {
  askForMasterPassword,
  askForAction,
  askForNewValue,
  askForAddOrModify,
  askForNewPassword,
} = require("./components/questions");

async function runPasswordManager() {
  const args = process.argv.slice(2);
  const passwordName = args[0];
  /* const newPasswordValue = args[1]; */

  const userInputMasterPasswort = await askForMasterPassword();

  if (userInputMasterPasswort !== process.env.MASTER_PASSWORD) {
    console.log("Wrong password, try again.");
    runPasswordManager();
    return;
  } else {
    await connect(process.env.DB_URL, process.env.DB_NAME);

    const collectionName = await collection("passwords");
    const addOrModify = await askForAddOrModify();

    if (addOrModify === "Add") {
      const newName = await askForNewValue();
      const newPassword = await askForNewPassword();

      await insertData(collectionName, newName, newPassword);
    } else {
      const chosenAction = await askForAction();
      if (chosenAction === "delete") {
        await deleteData(collectionName, passwordName);
      } else if (chosenAction === "update") {
        const newValue = await askForNewValue();
        await updateData(collectionName, passwordName, newValue);
      } else if (chosenAction === "read") {
        const password = await readData(collectionName, passwordName);
        console.log(password);
      }
    }
  }
  async function closeSession() {
    await close();
  }
  await closeSession();
}
runPasswordManager();
