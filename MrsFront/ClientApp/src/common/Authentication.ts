import { Utils } from "./Utils";
import { User } from "../model/Model";

let user: User | undefined;

async function signIn(email: string, password: string): Promise<User | undefined> {
  const response = await Utils.fetchBackend(
    "/api/authentication/signin", {
      method: "POST",
      headers: { password, email }
    }
  );

  if (!response.ok)
    return undefined;

  try {
    user = await response.json();
    return user;
  }
  catch {
    return undefined;
  }
}

function getSignedInUser() {
  return user;
}

function signOut() {
  user = undefined;
}

export const Authentication = {
  signIn,
  signOut,
  getSignedInUser,
};