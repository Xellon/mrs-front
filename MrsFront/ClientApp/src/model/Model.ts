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