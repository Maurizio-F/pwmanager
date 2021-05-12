import {
  askForMainPassword,
  chooseCommand,
  chooseService,
  askForCredential,
} from "./utils/questions";
import { isMainPasswordValid, isCredentialValid } from "./utils/validation";
import { printPassword } from "./utils/message";

// function start() {
const start = async () => {
  /* Solution with while */
  let mainPassword = await askForMainPassword();
  while (!isMainPasswordValid(mainPassword)) {
    console.log("Is invalid");
    mainPassword = await askForMainPassword();
  }
  console.log("Is valid");

  const command = await chooseCommand();
  switch (command) {
    case "list":
      {
        const service = await chooseService(["GitHub", "Codewars", "Google"]);
        printPassword(service);
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
