import type { Credential } from "../types";
import { askForCredential } from "./questions";
import CryptoJS from "crypto-js";
import { getCollection, getCredentialsCollection } from "./database";

export const readCredentials = async (): Promise<Credential[]> => {
  return await getCredentialsCollection().find().sort({ service: 1 }).toArray();
};

export const saveCredentials = async (password: string): Promise<void> => {
  const newCredential = await askForCredential();
  const passwordEncrypt = CryptoJS.AES.encrypt(
    newCredential.password,
    password
  ).toString();
  newCredential.password = passwordEncrypt;
  await getCollection("credentials").insertOne(newCredential);
};

export const deleteCredential = async (
  credential: Credential
): Promise<void> => {
  await getCollection("credentials").deleteOne(credential);
  console.log("Done");
};
