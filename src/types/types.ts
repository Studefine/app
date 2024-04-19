export interface IUser {
  id: string;
  name: string;
  email: string;
  roles: string[];
}

export interface ILoginResponse {
  user?: IUser;
  token?: string;
}

export interface ICredentials {
  email: IUser["email"];
  password: string;
}

export interface ILoginParameters extends ICredentials {
  stayLoggedIn: boolean;
}
type IRole = "member" | "admin";

export interface IMember extends IUser {
  role: IRole;
}

export interface IElement {
  id: string;
  name: string;
  description: string;
}

export interface ITopic extends IElement {}
export interface IPhrase extends IElement {
  vccd: any;
}
export interface IGroup extends IElement {
  person: IMember;
}

export type ElementType = "TOPIC" | "GROUP" | "PHRASE";

export interface IBreadCrumb<T extends IElement = IPhrase> {
  id?: T["id"];
  name?: T["id"];
  type?: ElementType;
}
