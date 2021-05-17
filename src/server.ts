import {
  askForMainPassword,
  chooseCommand,
  chooseService,
} from "./utils/questions";
import { isMainPasswordValid } from "./utils/validation";
// import { printPassword } from "./utils/message";
import { readCredentials, saveCredentials } from "./utils/credentials";
import CryptoJS from "crypto-js";

// function start() {
const start = async () => {
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
        const credentials = await readCredentials();
        const credentialServices = credentials.map(
          (credential) => credential.service
        );

        const service = await chooseService(credentialServices);
        const selectedService = credentials.find(
          (credential) => credential.service === service
        );

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
        saveCredentials(mainPassword);
      }

      break;
  }
};

start();
