import { ICategory } from "./eventcategory";

export interface IMetaData {
  title: string;
  description: string;
  url: string;
}

export interface IQueryConfig {
  offset: number;
  limit: number;
  sort?: string;
  title?: string;
  dateRange?: number;
  categorys?: any[];
}

export interface IFilterParams {
  title?: string;
  dateRange?: any[];
  category?: string[];
}

export interface IFilterQueryString {
  title?: string;
  dateRange?: number;
  category?: string;
}

export interface IDateFilter {
  id: string;
  displayName: string;
}

export interface IEvent {
  _id: string;
  user_id: string;
  slug: string;
  title: string;
  topic?: string;
  description: string;
  likes: number;
  trending: boolean;
  active: boolean;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  tickets: ITicket[];
  category: ICategory[];
  imageUrl?: string;
  location?: ILocation;
  onlineUrl?: string;
}

export interface ILocation {
  id: number;
  name: string;
  address1: string;
  address2?: string;
  city: string;
  postcode?: string;
  country?: string;
  website?: string;
  imageURL?: string;
  latitude?: number;
  longitude?: number;
}

export interface ITicket {
  id: number;
  freeEvent: boolean;
  price?: number;
  type?: string;
  description?: string;
}

export class CustomServiceError {
  errornumber: number;
  message: string;
  friendlyMessage: string;
}
