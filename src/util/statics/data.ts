import {CreateNFTStep, MessageTemplateType, TemplateContentType, TemplateEventType} from "@/util/enums/enum";
import SelectedEventTemplate from "@/components/steps/SelectedEventTemplate";

export const messageTemplate = [
  {
    step: CreateNFTStep.step1,
    order: 0,
    next: 1,
    type: MessageTemplateType.SELECTED_EVENT,
    contents: [
      {
        type: TemplateContentType.EVENT,
        text: '얼리버드 신청하기',
        next: 1,
      },
      {
        type: TemplateContentType.EVENT,
        title: '입장권 NFT 만들기',
        next: 1,
      },
      {
        type: TemplateContentType.EVENT,
        title: '이벤트 만족 설문조사하기',
        next: 1,
      },
      {
        type: TemplateContentType.EVENT,
        title: '컨퍼런스 사전 발권 템플릿',
        next: 1,
      },
      {
        type: TemplateContentType.EVENT,
        title: '출시 알림 받기',
        next: 1,
      },
      {
        type: TemplateContentType.EVENT,
        title: '뉴스레터 구독 설문 템플릿',
        next: 1,
      },
      {
        type: TemplateContentType.EVENT,
        title: '제품구매 후기 템플릿',
        next: 1,
      },
      {
        type: TemplateContentType.EVENT,
        title: '서비스 사전 등록 템플릿',
        next: 1,
      },
    ]
  },
  {
    step: CreateNFTStep.step2,
    order: 1,
    next: 2,
    type: MessageTemplateType.SELECTED_INFORMATION,
    text: '선택해주신 이벤트를 기반으로 아래와 같은 수집 정보들을 추천드려요. \n사용자에게 수집할 정보를 하나 선택해주세요.',
    contents: [
      {
        type: TemplateContentType.INFORMATION,
        title: '유저 위치정보 수집',
        description: '유저의 GPS값을 수집받을 수 있습니다.',
        exampleNotice: '예시 :행사장 위치를 인증한 사람들만 받을 수 있어요.',
        next: 3,
      },
      {
        type: TemplateContentType.INFORMATION,
        title: '이미지 수집',
        description: '이미지를 수집받을 수 있습니다.',
        exampleNotice: '예시 : 페스티벌 인증샷을 제출해주세요!',
        next: 2,
      },
      {
        type: TemplateContentType.INFORMATION,
        title: '텍스트 수집',
        description: '텍스트 값을 수집 받을 수 있습니다.',
        exampleNotice: '예시 : 음식을 드시고 리뷰를 남겨주세요!',
        next: 4,
      },
    ]
  },
  {
    step: CreateNFTStep.step2,
    order: 2,
    next: 5,
    type: MessageTemplateType.DEFAULT,
    text: '이미지 수집을 선택하셨군요!',
    contents: []
  },
  {
    step: CreateNFTStep.step2,
    order: 5,
    type: MessageTemplateType.INPUT_DESCRIPTION,
    text: '사용자 앱에 보여질 문구를 작성해주세요.\n예시 : 저희 서비스를 이용하신 후 부스가 잘 보이도록 인증샷을 찍어주세요! 추첨을 통해 NFT를 드리고 있어요.',
    contents: []
  }
]

export const selectedItems =  [
  {
    type: TemplateEventType.EARLY_BIRD,
    title: 'Apply for Early Bird',
    icon: '/images/icons/icon-early-bird.webp'
  },
  {
    type: TemplateEventType.TICKET_NFT,
    title: 'Create an admission ticket NFT',
    icon: '/images/icons/icon-ticket.webp'
  },
  {
    type: TemplateEventType.QUESTION_INVESTIGATION,
    title: 'Take an Event Satisfaction Survey',
    icon: '/images/icons/icon-question-investigation.webp'
  },
  {
    type: TemplateEventType.PREISSUANCE_OF_CONFERENCE,
    title: 'Conference Advance Ticketing Template',
    icon: '/images/icons/icon-conference.webp'
  },
  {
    type: TemplateEventType.RECEIVE_RELEASE_NOTIFICATION,
    title: 'Get a release notification',
    icon: '/images/icons/icon-notification.webp'
  },
  {
    type: TemplateEventType.NEWSLETTER_SUBSCRIPTION_SURVEY,
    title: 'Newsletter survey template',
    icon: '/images/icons/icon-news-letter.webp'
  },
  {
    type: TemplateEventType.PRODUCT_PURCHASE_REVIEW,
    title: 'Product Review Template',
    icon: '/images/icons/icon-review.webp?1'
  },
  {
    type: TemplateEventType.PREISSUANCE_OF_SERVICE,
    title: 'Service pre-registration template',
    icon: '/images/icons/icon-service.webp'
  },
]