import * as Model from "../model/Model";
import { Utils } from "./Utils";

export class Client {
  private _basicData: Model.User;

  constructor(basicData: Model.User) {
    this._basicData = Object.freeze(basicData);
  }

  public get data() { return this._basicData; }

  public get movies(): Model.Movie[] {
    return [];
  }

  public async getMembership(): Promise<Model.Membership | undefined> {
    const response = await Utils.fetchBackend(`/api/data/membership?userId=${this._basicData.id}`);

    if (!response.ok)
      return undefined;

    const membership: Model.Membership | undefined = await response.json();

    return membership;
  }

}