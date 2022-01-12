export interface DesignerDTO {
  id: number;
  designer: string;
}

export interface DiaryCommentDTO {
  id: number;
  comment: string;
  time: Date;
}

export interface DiaryDTO {
  diary: Diary;
  rating: number;
}

export interface DiaryRatingDTO {
  id: number;
  rating: number;
}

export interface ForumDTO {
  forum: Forum;
  rating: number;
}

export interface ForumMessageDTO {
  id: number;
  message: string;
  messageTime: Date;
}

export interface GameDTO {
  game: Game;
  rating: number;
  designers: string[];
}

export interface GameSellDTO {
  game: Game;
  condition: string;
  comment: string;
  price: number;
}

export interface UserDTO {
  user: User;
}

export interface UsersGameRatingDTO {
  user: User;
  rating: number;
}

export interface Diary {
  id: number;
  title: string;
  text: string;
  publicationTime: Date;
  game: Game;
  user: User;
}

export interface Forum {
  id: number;
  title: string;
  text: string;
  publicationTime: Date;
  game: Game;
  user: User;
}

export interface Game {
  id: number;
  title: string;
  yearOfRelease: Date;
  annotation: string;
  description: string;
  picture: any;
  playerAge: string;
  playersMin: number;
  playersMax: number;
  timeToPlayMin: number;
  timeToPlayMax: number;
}

export interface User {
  id: number;
  name: string;
  password: string;
  role: string;
  mail: string;
  town: string;
  rating: number;
  avatar: any;
  registrationDate: Date;
}
