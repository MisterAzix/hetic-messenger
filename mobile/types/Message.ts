import { IUser } from "./User";

export interface IMessage {
  from: IUser;
  to: IUser;
  content: string;
  sent_at: Date;
}
