interface IMessage {
  title: string;
  message: string;
  registeredAt: string;
  toBeSentAt: number;
  _id?: string;
}

export class Message implements IMessage {
  constructor(
    public title: string,
    public message: string,
    public toBeSentAt: number,
    public registeredAt: string,
    public _id?: string
  ) { }
}
