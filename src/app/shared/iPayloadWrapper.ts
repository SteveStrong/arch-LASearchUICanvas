
export type Constructable<T> = new (...args: any) => T;
export type FuncAny = (...args: any) => any;
export type FuncT<T> = (arg: T) => any;

export interface iPayloadWrapper {
  dateTime: Date;
  length: number;
  payloadType: string;
  payload: Array<any>;
  hasError: boolean;
  message: string;
}
