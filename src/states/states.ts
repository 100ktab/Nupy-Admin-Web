// @ts-nocheck
import {atom, selector} from "recoil";
import {AccountType, ChatType, CreateNFTType, SearchLocationType} from "@/util/types/types";
import {CreateNFTStep, MessageTemplateType} from "@/util/enums/enum";

/**
 * 유저 정보
 */
export const accountState = atom<AccountType>({
  key: 'accountState',
  default: {
    addr: '',
    cid: '',
    expiredAt: 0,
    f_type: "USER",
    loggedIn: false
  }
})

export const accountSelector = selector<AccountType>({
  key: 'accountSelector',
  get: ({get}) => get(accountState),
  set: ({get, set, reset}, account : AccountType) => {
    set(accountState, account)
  }
})

/**
 * nft 생성 정보
 */
export const createNTFState = atom<CreateNFTType>({
  key: 'createNTFState',
  default: {
    step: CreateNFTStep.step1,
    currentTemplate: MessageTemplateType.SELECTED_EVENT,
    selectedEventTemplate: '',
    selectedCollectInformation: '',
    nftTitle: '',
    nftDescription:'',
    tone: '',
    nftImage: '',
    numberOfIssue: 0,
    enterCode: '',
    startDateTime: 0,
    endDateTime: 0,
    collectInformationDescription: "",
  }
})

export const searchLocation = atom<SearchLocationType>({
  key: 'searchLocation',
  default: {
    country: '',
    address: '',
    range: 0,
    longitude: 0,
    latitude: 0,
  }
})


/**
 * 채팅 리스트
 */
export const chatListState = atom<ChatType[]>({
  key: 'chatListState',
  default: [
    {
      template: MessageTemplateType.SELECTED_EVENT,
      text: '',
      imageURL: '',
    }
  ]
})

export const chatListSelector = selector({
  key: 'chatListSelector',
  get: ({get}) => get(chatListState),
  set: ({set}, newChatItem: ChatType) => {
    set(chatListState, (oldChatListState) => [...oldChatListState, newChatItem]);
  },
})
