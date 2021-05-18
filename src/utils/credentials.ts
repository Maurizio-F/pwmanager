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
  await getCredentialsCollection().deleteOne(credential);
  console.log("Deleted");
};

// export const selectCredential = async (): Promise<Credential> => {
//   const credentials = await readCredentials();
//   const credentialServices = credentials.map(
//     (credential) => credential.service
//   );

//   const service = await chooseService(credentialServices);
//   const selectedService = credentials.find(
//     (credential) => credential.service === service
//   );
//   if (!selectedService) {
//   throw new Error("");
// }
//     return selectedService;
//
// };
