import {
  CreateNFTStep,
  MessageTemplateType,
  SelectCollectInformationType,
  TemplateContentType,
  TemplateEventType
} from "@/util/enums/enum";
import SelectedEventTemplate from "@/components/steps/SelectedEventTemplate";

export const selectedCollectInformation = [
  {
    type: SelectCollectInformationType.GPS,
    title: 'Collect user location information',
    description: 'Can collect user GPS values.',
    exampleNotice: 'Example: Only those who verify the location of the event site can receive it.',
    next: 3,
  },
  {
    type: SelectCollectInformationType.IMAGE,
    title: 'Collect images',
    description: 'Images can be collected.',
    exampleNotice: 'Example: Please submit a celebration certification photo!',
    next: 2,
  },
  {
    type: SelectCollectInformationType.TEXT,
    title: 'Collect Text',
    description: 'Text values can be collected.',
    exampleNotice: 'Example: Please leave a comment after eating the food!',
    next: 4,
  },
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