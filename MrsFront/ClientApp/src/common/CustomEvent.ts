type EventCallback<TEventArgs> = (sender: Object, args: TEventArgs) => void;

export default class CustomEvent<TEventArgs = any> {
  private _callbackList = new Array<EventCallback<TEventArgs>>();

  public notify(sender: Object, args: TEventArgs) {
    for (const callback of this._callbackList) {
      callback(sender, args);
    }
  }

  public register(callback: EventCallback<TEventArgs>) {
    this._callbackList.push(callback);
  }

  public unregister(callback: EventCallback<TEventArgs>) {
    this._callbackList.splice(this._callbackList.indexOf(callback), 1);
  }
}