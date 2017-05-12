export interface EventType {
  id?: string;
  eventId: number;
  eventLink: string;
  type: string;
  location: string;
  headerImage: string;
  eventTitle: string;
  eventDescription: string;
  eventAchievement: string;
  eventRewardGear: {
    images: {
      item: string
    }[]
  }[];
  signups: {
    userNames: string[]
  }[];
  eventVideoLink: string;
  eventLocationTitle: string;
  eventLocation: string;
  eventDate: string;
  eventStartTime: string;
  eventEndTime: string;
  active: string;
}
