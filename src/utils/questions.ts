import inquirer from "inquirer";
import { Command } from "../types";

// export function askForMainPassword(): Promise<string> {
export const askForMainPassword = (): Promise<string> => {
  return inquirer
    .prompt<{ mainPassword: string }>([
      {
        type: "password",
        name: "mainPassword",
        message: "Enter main password （⊙ｏ⊙)",
      },
    ])
    .then((answers) => answers.mainPassword);
};

export const chooseCommand = async (): Promise<Command> => {
  const answers = await inquirer.prompt<{ command: Command }>({
    type: "list",
    name: "command",
    message: "What do you want to do",
    choices: [
      { name: "List all credentials", value: "list" },
      { name: "Add new credentials", value: "add" },
    ],
  });
  return answers.command;
};

export const askForNewPassword = (): Promise<string> => {
  return inquirer
    .prompt<{ pw: string }>([
      {
        type: "password",
        name: "mainPassword",
        message: "Enter new password",
      },
    ])
    .then((answers) => answers.pw);
};
