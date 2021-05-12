import { Credential } from "../types";

export const isMainPasswordValid = (mainPassword: string): boolean => {
  return mainPassword === "123";
};

export const isCredentialValid = (credential: Credential): boolean => {
  if (credential.service == "GitHub") {
    console.log("Service is already used");
    return false;
  }
  return true;
};
