import type { Credential } from "../types";
import { chooseService } from "./questions";
import CryptoJS from "crypto-js";
import { getCollection, getCredentialsCollection } from "./database";

export const readCredentials = async (): Promise<Credential[]> => {
  return await getCredentialsCollection().find().sort({ service: 1 }).toArray();
};

export const saveCredentials = async (
  credential: Credential,
  mainPassword: string
): Promise<void> => {
  const passwordEncrypt = CryptoJS.AES.encrypt(
    credential.password,
    mainPassword
  ).toString();
  credential.password = passwordEncrypt;
  await getCollection("credentials").insertOne(credential);
};

export const deleteCredential = async (
  credential: Credential
): Promise<void> => {
  await getCredentialsCollection().deleteOne(credential);
  console.log("Deleted");
};

export const selectCredential = async (): Promise<Credential> => {
  const credentials = await readCredentials();
  const credentialServices = credentials.map(
    (credential) => credential.service
  );

  const service = await chooseService(credentialServices);
  const selectedService = credentials.find(
    (credential) => credential.service === service
  );
  if (!selectedService) {
    throw new Error("Can not find credential");
  }
  return selectedService;
};
