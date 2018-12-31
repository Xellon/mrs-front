import { Utils } from "./Utils";
import * as Model from "../model/Model";

let user: Model.User | undefined;

async function signIn(email: string, password: string): Promise<Model.User | undefined> {
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

function getSignedInUser(): Model.User | undefined {
  //  return user;
  return {
    email: "client@test.com",
    id: Model.UserType.Client,
    userType: Model.UserType.Client,
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