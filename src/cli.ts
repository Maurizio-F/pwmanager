import dotenv from "dotenv";
import { askForMainPassword, chooseCommand } from "./utils/questions";
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
        await saveCredentials(mainPassword);
      }

      break;

    case "delete":
      {
        const selectedService = await selectCredential();
        if (selectedService) {
          await deleteCredential(selectedService);
        }
      }
      break;
  }
  await disconnectDatabase();
};

start();

// async function selectCredential() {
//   const credentials = await readCredentials();
//   const credentialServices = credentials.map(
//     (credential) => credential.service
//   );

//   const service = await chooseService(credentialServices);
//   const selectedService = credentials.find(
//     (credential) => credential.service === service
//   );
//   return selectedService;
// }
