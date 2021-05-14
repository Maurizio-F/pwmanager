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

export const saveCredentials = async (): Promise<void> => {
  const credentials = await readCredentials();
  const newCredential = await askForCredential();
  const AES = CryptoJS.AES.encrypt(newCredential.password, "test").toString();
  console.log("Password", "test");
  newCredential.password = AES;
  credentials.push(newCredential);
  const newDB = { credentials: credentials };
  const newCredentialListJSON = JSON.stringify(newDB, null, 2);
  await fs.writeFile("./db.json", newCredentialListJSON);
  await console.log("We have saved your new credential!");
};

// ​
// var decrypted = CryptoJS.AES.decrypt(encrypted, "Secret Passphrase");
