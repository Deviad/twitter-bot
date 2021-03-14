interface ISentMessage {
  message: string;
  sentAt: number;
  _id?: string;
}

export class SentMessage implements ISentMessage {
  constructor(
    public message: string,
    public sentAt: number,
    public _id?: string
  ) { }
}
