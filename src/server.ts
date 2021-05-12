import {
  askForMainPassword,
  chooseCommand,
  chooseService,
  askForCredential,
} from "./utils/questions";
import { isMainPasswordValid, isCredentialValid } from "./utils/validation";
// import { printPassword } from "./utils/message";
import { readCredentials } from "./utils/credentials";

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
        console.log(selectedService);
        // printPassword(service);
      }
      break;
    case "add":
      {
        let newCredential = await askForCredential();
        while (!isCredentialValid(newCredential)) {
          newCredential = await askForCredential();
        }
      }
      break;
  }
};

start();
