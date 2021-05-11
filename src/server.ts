import { askForMainPassword } from "./utils/questions";
import { isMainPasswordValid } from "./utils/validation";

// function start() {
const start = async () => {
  /* Solution with while */
  let mainPassword = await askForMainPassword();
  while (!isMainPasswordValid(mainPassword)) {
    console.log("Is invalid");
    mainPassword = await askForMainPassword();
  }
  console.log("Is valid");
};

start();
