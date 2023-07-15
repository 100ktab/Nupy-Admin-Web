// @ts-nocheck
import {useRecoilState} from "recoil";
import {accountSelector, chatListSelector, createNTFSelector, createNTFState, searchLocation} from "@/states/states";
import {ChatType, CreateNFTType, SearchLocationType} from "@/util/types/types";
import {CreateNFTStep, MessageTemplateType} from "@/util/enums/enum";
import {makeText} from "@/util/externals/ai/client";
import {checkSameString, rexpString, toTitleCase} from "@/util/string/stringUtil";
import {searchAddress} from "@/util/externals/map/map";
import {mintAll} from "@/util/externals/wallet/wallet";

export const useCreateNFT = () => {
  const [createNFT, setCreateNFT] = useRecoilState(createNTFSelector)
  const [location, setLocation] = useRecoilState(searchLocation)
  const [chatList, setChatList] = useRecoilState(chatListSelector)
  const [account, setAccountInfo] = useRecoilState(accountSelector)

  const getLocation = () => {
    return location
  }

  const setLocationInfo = (key, value) => {
    setLocation((prev) => ({
      ...prev,
      [`${key}`] : value
    }))
  }

  const setCurrentTemplate = (value) => {
    setCreateNFT({
      key: 'currentTemplate',
      value: value
    })
  }

  const nextStep = () => {
    setCreateNFT({
      key: 'step',
      value: createNFT.step + 1
    })
  }

  const setCreateInfo = (key, value) => {
    setCreateNFT({
      key : key,
      value: value
    })
  }

  const getCreateNFTInfo = () => {
    return createNFT
  }

  const addChat = (newChat: ChatType) => {
    setChatList(newChat)
    if (createNFT.currentTemplate === MessageTemplateType.SELECTED_INFORMATION_IMAGE) {
      setChatList({
        template: MessageTemplateType.DEFAULT_BY_ADMIN,
        text: 'Thank you :)'
      })
      setCurrentTemplate(MessageTemplateType.END)
    } else if(createNFT.currentTemplate === MessageTemplateType.SELECTED_INFORMATION_COUNTRY) {
      const input = newChat.text?.toLocaleUpperCase()
      const searchResultBySameText = checkSameString(input)
      console.log(searchResultBySameText)
      let findOne = false
      if (searchResultBySameText.length === 1) {
        setLocation((prev) => ({...prev, country: searchResultBySameText[0][0]}))
        findOne = true
      } else {
        const searchResultByRexp = rexpString(input)
        console.log(searchResultByRexp)
        if (searchResultByRexp.length > 1 || searchResultByRexp.length === 0) {
          const searchResultString = searchResultByRexp.map(([countryCode, countryName]) => {
            return `- ${toTitleCase(countryName)}`
          }).join('\n')
          setChatList({
            template: MessageTemplateType.DEFAULT_BY_ADMIN,
            text: `Please enter the country/region accurately again. ${!searchResultString ? '' : "\n" + searchResultString}`
          })
        } else {
          setLocation((prev) => ({...prev, country: searchResultByRexp[0][0]}))
          findOne = true
        }
      }
      console.log(findOne)
      if (findOne) {
        console.log(findOne)
        setChatList({
          template: MessageTemplateType.SELECTED_INFORMATION_ADDRESS,
        })
        setCurrentTemplate(MessageTemplateType.SELECTED_INFORMATION_ADDRESS)
      }
    } else if(createNFT.currentTemplate === MessageTemplateType.SELECTED_INFORMATION_ADDRESS) {
      const address = newChat.text
      setLocation((prev) => ({...prev, address: newChat.text as string}))
      searchAddress(address, location.country)
        .then(result => {
          const longitude = parseFloat(result[0] as string)
          const latitude = parseFloat(result[1] as string)
          setChatList({
            template: MessageTemplateType.SELECTED_INFORMATION_LOCATION,
            text: ''
          })
          setCurrentTemplate(MessageTemplateType.SELECTED_INFORMATION_LOCATION)
          setLocation((prev: SearchLocationType) => ({
            ...prev,
            longitude: longitude,
            latitude: latitude
          }));
          setLocation((prev: SearchLocationType) => ({...prev, longitude: longitude, latitude: latitude}))
          }).catch(e => {
        setChatList({
          template: MessageTemplateType.DEFAULT_BY_ADMIN,
          text: `Please enter a more detailed address accurately again.`
        })
      })
    } else if(createNFT.currentTemplate === MessageTemplateType.NFT_TITLE) {
      setCreateNFT((prev) => ({...prev, nftTitle: newChat.text}))
      setChatList({
        template: MessageTemplateType.NFT_DESCRIPTION_TONE,
      })
      setCurrentTemplate(MessageTemplateType.NFT_DESCRIPTION_TONE)
    } else if(createNFT.currentTemplate === MessageTemplateType.NFT_DESCRIPTION) {
      makeText(newChat.text, createNFT.tone)
        .then(result => {
          // API 호출 결과값(result)을 사용하는 로직 작성
          console.log(result);
          setCreateNFT((prev: CreateNFTType) => ({...prev, nftDescription: result.replace(/\n/g, '') as string}))
          setChatList({
            template: MessageTemplateType.DEFAULT_BY_ADMIN,
            text: result as string
          })
          setChatList({
            template: MessageTemplateType.NFT_IMAGE,
          })
          setCurrentTemplate(MessageTemplateType.NFT_IMAGE)
        })
        .catch(error => {
          // 에러 처리
          console.error(error);
        });
    } else if (createNFT.currentTemplate === MessageTemplateType.NUMBER_OF_ISSUES) {
      setCreateNFT((prev) => ({...prev, numberOfIssue: newChat.text as number}))
      setChatList({
        template: MessageTemplateType.ENTER_CODE,
      })
      setCurrentTemplate(MessageTemplateType.ENTER_CODE)
      nextStep()
    } else if (createNFT.currentTemplate === MessageTemplateType.ENTER_CODE) {
      setCreateNFT((prev) => ({...prev, enterCode: newChat.text?.replace(/ /g, "_") as string}))
      setChatList({
        template: MessageTemplateType.GENERATE_NFT,
      })
      setCurrentTemplate(MessageTemplateType.GENERATE_NFT)
    }
  }

  const resetChatList = () => {
    setChatList(null)
    setCreateNFT({
      key: 'step',
      value: CreateNFTStep.step1
    })
  }

  const getCreateNFTParams = () => {
    return {
      "name": createNFT.nftTitle,
      "description": createNFT.nftDescription,
      "uri": `ipfs://${createNFT.nftImage}`,
      "start_time" : createNFT.startDateTime,
      "end_time": createNFT.endDateTime,
      "event_type" : createNFT.selectedEventTemplate,
      "collect_information_type" : createNFT.selectedCollectInformation,
      "creator": account.addr,
      "enter_code": createNFT.enterCode,
      "number_of_issues": createNFT.numberOfIssue,
      "nft_collection_id" : `${account.addr}_${Date.now()}`,
      "collect_information_info" : {
        "description": createNFT.collectInformationDescription,
        "location" : {
          "longitude": location.longitude,
          "latitude" : location.latitude
        },
        "address": location.address,
        "range" : location.range,
      },
    }
  }

  return {
    chatList,
    addChat,
    nextStep,
    setCurrentTemplate,
    getLocation,
    setChatList,
    setCreateInfo,
    getCreateNFTInfo,
    getCreateNFTParams,
    resetChatList,
    setLocationInfo
  }
}