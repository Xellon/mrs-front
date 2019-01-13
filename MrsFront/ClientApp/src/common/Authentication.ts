import { Utils } from "./Utils";
import * as DB from "../model/DB";

let user: DB.User | undefined;

async function signIn(email: string, password: string): Promise<DB.User | undefined> {
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

function getSignedInUser(): DB.User | undefined {
  //  return user;
  return {
    email: "client@test.com",
    id: DB.UserType.Client,
    userType: DB.UserType.Client,
  };
}

function signOut() {
  user = undefined;
}

export const Authentication = {
  signIn,
  signOut,
  getSignedInUser,
};