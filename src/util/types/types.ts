import {util} from "protobufjs";
import float = util.float;

export type AccountType = {
  addr: string,
  cid: string,
  expiredAt: number,
  f_type: string,
  loggedIn: boolean;
}

export type CreateNFTType = {
  selectedEventTemplate: string;
  selectedCollectInformation: string;
  currentTemplate: string;
  step: number;
  nftTitle: string;
  nftDescription: string;
  tone: string;
  nftImage: string;
  numberOfIssue: number;
  enterCode: string;
  startDateTime: number;
  endDateTime: number;
  collectInformationDescription: string;
}

export type SearchLocationType = {
  country: string;
  address: string;
  longitude: number;
  latitude: number;
  range: number;
}

export type ChatType = {
  template: string;
  text?: string;
  imageURL?: string;
  reset?: boolean;
}

export type SetCreateNFTType = {
  key: string;
  value: string|number;
}