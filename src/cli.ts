import dotenv from "dotenv";
import {
  askForCredential,
  askForMainPassword,
  chooseCommand,
} from "./utils/questions";
import { isMainPasswordValid } from "./utils/validation";
// import { printPassword } from "./utils/message";
import {
  deleteCredential,
  saveCredentials,
  selectCredential,
} from "./utils/credentials";
import CryptoJS from "crypto-js";
import { connectDatabase, disconnectDatabase } from "./utils/database";

dotenv.config();

// function start() {

const start = async () => {
  if (process.env.MONGO_URL === undefined) {
    throw new Error("Missing env Mongo_URL");
  }

  await connectDatabase(process.env.MONGO_URL);

  /* Solution with while */
  let mainPassword = await askForMainPassword();
  while (!(await isMainPasswordValid(mainPassword))) {
    console.log("Is invalid");
    mainPassword = await askForMainPassword();
  }
  console.log("Is valid");

  const command = await chooseCommand();
  switch (command) {
    case "list":
      {
        const selectedService = await selectCredential();

        if (selectedService) {
          const passwordDecrypt = CryptoJS.AES.decrypt(
            selectedService.password,
            mainPassword
          );
          console.log(`${selectedService.service}: 
          Username: ${selectedService.username}
          Password: ${passwordDecrypt.toString(CryptoJS.enc.Utf8)}`);
        }
      }
      break;

    case "add":
      {
        await saveCredentials(await askForCredential(), mainPassword);
      }

      break;

    case "delete":
      {
        const selectedService = await selectCredential();
        if (selectedService) {
          await deleteCredential("selectCredential.service");
        }
      }

      break;
  }
  await disconnectDatabase();
};

start();
