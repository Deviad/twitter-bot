export interface IScheduledMessage {
  message: string;
  registeredAt: number;
  toBeSentAt: number;
  _id?: string;
}

export class ScheduledMessage implements IScheduledMessage {
  constructor(
    public message: string,
    public toBeSentAt: number,
    public registeredAt: number,
    public _id?: string
  ) { }
}
