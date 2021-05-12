import { Credential } from "../types";
import sha256 from "crypto-js/sha256";
import fs from "fs/promises";

export const isMainPasswordValid = async (
  plaintextPassword: string
): Promise<boolean> => {
  const passwordHash = await fs.readFile("./.password", "utf-8");
  return sha256(plaintextPassword).toString() === passwordHash;
};

export const isCredentialValid = (credential: Credential): boolean => {
  if (credential.service == "GitHub") {
    console.log("Service is already used");
    return false;
  }
  return true;
};
