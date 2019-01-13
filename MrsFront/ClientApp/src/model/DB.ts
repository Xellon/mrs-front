export enum UserType {
  Client = 1,
  Admin,
  Finance,
}

export interface User {
  id: number;
  email: string;
  userType: UserType;
}

export interface Movie {
  id: number;
  description: string;
  title: string;
  tags: Tag[];
  averageRating: number;
  imageUrl?: string;
}

export interface Tag {
  id: number;
  text: string;
}

export interface Membership {
  id: number;
  usesLeft: number;
}

export enum ReceiptType {
  OneTimeRecommendation,
  Membership,
  ExtraRecommendation,
}

export interface Receipt {
  id: number;
  membershipId?: number;
  recommendationId?: number;
  receiptDate: string;
  paymentAmount: number;
  receiptType: ReceiptType;
}

export interface RecommendedMovie {
  recommendationId: number;
  movieId: number;
  possibleRating: number;
}

export interface UserMovie {
  userId: number;
  movieId: number;
  rating: number;
}