import { askForMainPassword, chooseCommand } from "./utils/questions";
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

  const command = await chooseCommand();
  switch (command) {
    case "list":
      console.log("List Case");
      break;
    case "add":
      console.log("Add Case");
      break;
  }
};

start();
