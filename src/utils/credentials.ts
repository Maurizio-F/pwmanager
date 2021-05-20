import type { Credential } from "../types";
import { chooseService } from "./questions";
import CryptoJS from "crypto-js";
import { getCollection, getCredentialsCollection } from "./database";

export const readCredentials = async (): Promise<Credential[]> => {
  return await getCredentialsCollection().find().sort({ service: 1 }).toArray();
};

export const readCredential = async (service: string): Promise<Credential> => {
  const credential = await getCredentialsCollection().findOne({ service });
  if (!credential) {
    throw new Error(`Can not find credential ${service}!`);
  }
  return credential;
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

export const deleteCredential = async (service: string): Promise<boolean> => {
  const result = await getCredentialsCollection().deleteOne({
    service: service,
  });
  if (result.deletedCount === undefined) {
    return false;
  }
  return result.deletedCount > 0;
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
