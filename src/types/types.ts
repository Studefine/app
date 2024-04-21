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
  definition: string;
  parent: IElement["id"] | null;
  children: IElement["id"][];
}

/** user can create plain definition for better connection about the definition **/
export interface PlainDefinition {
  id: string;
  definition: string;
  createdAt: number;
  modifiedAt: number;
  parentId: PlainDefinition["id"];
  childIds: PlainDefinition["id"][];
}

/** version-controlled plain definition **/
export interface VCPD {
  plainDefinition: PlainDefinition[];
  active: PlainDefinition["id"];
}

export type LeitnerLevel = 0 | 1 | 2 | 3 | 4;

export interface IPhrase extends Omit<IElement, "children"> {
  vcpd: VCPD;
  leitnerLevel: LeitnerLevel;
}
export interface ITopic extends IElement {
  /** the counts of the leitner boxes **/
  leitnerBoxesCounts: [number, number, number, number, number];
}
export interface ITopicCreate extends Omit<ITopic, "id"> {}
export interface IPhraseCreate extends Omit<ITopic, "id"> {}
export interface IGroup extends IElement {
  person: IMember;
}

export type ElementType = "TOPIC" | "GROUP" | "PHRASE";

export interface IBreadCrumb<T extends IElement = ITopic> {
  id?: T["id"];
  name?: T["id"];
  type?: ElementType;
}
