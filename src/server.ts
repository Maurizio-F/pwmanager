import {
  askForMainPassword,
  chooseCommand,
  askForNewPassword,
} from "./utils/questions";
import { isMainPasswordValid } from "./utils/validation";

const pwlist = [
  { name: "Github", password: "1234" },
  { name: "PayPal", password: "1234" },
  { name: "Netflix", password: "1234" },
];

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
      console.log(pwlist);
      break;
    case "add":
      askForNewPassword();
      break;
  }
};

start();
