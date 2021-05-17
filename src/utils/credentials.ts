import fs from "fs/promises";
import type { Credential } from "../types";
import { askForCredential } from "./questions";
import CryptoJS from "crypto-js";

type DB = {
  credentials: Credential[];
};

export const readCredentials = async (): Promise<Credential[]> => {
  const response = await fs.readFile("./db.json", "utf-8");
  const data: DB = JSON.parse(response);
  return data.credentials;
};

export const saveCredentials = async (password: string): Promise<void> => {
  const credentials = await readCredentials();
  const newCredential = await askForCredential();
  const passwordEncrypt = CryptoJS.AES.encrypt(
    newCredential.password,
    password
  ).toString();
  newCredential.password = passwordEncrypt;
  credentials.push(newCredential);
  const newDB = { credentials: credentials };
  const newCredentialListJSON = JSON.stringify(newDB, null, 2);
  await fs.writeFile("./db.json", newCredentialListJSON);
  console.log("Done");
};
