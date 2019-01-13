import * as DB from "../model/DB";
import { Utils } from "./Utils";

export class Client {
  private _basicData: DB.User;

  constructor(basicData: DB.User) {
    this._basicData = Object.freeze(basicData);
  }

  public get data() { return this._basicData; }

  public get movies(): DB.Movie[] {
    return [];
  }

  public async getMembership(): Promise<DB.Membership | undefined> {
    const response = await Utils.fetchBackend(`/api/data/membership?userId=${this._basicData.id}`);

    if (!response.ok)
      return undefined;

    const membership: DB.Membership | undefined = await response.json();

    return membership;
  }

}