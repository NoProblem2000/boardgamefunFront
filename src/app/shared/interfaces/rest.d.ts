export interface GameDTO {
  game: Game;
  rating: number;
  designers: string[];
}

export interface DesignersProjection {
  designer: string;
}

export interface DiariesWithRatingsProjection {
  diary: Diary;
  rating: number;
}

export interface ForumProjection {
  forum: Forum;
  rating: number;
}

export interface GameProjection {
  rating: number;
  game: Game;
}

export interface GameSellProjection {
  comment: string;
  game: Game;
  price: number;
  condition: string;
}

export interface GamesFilterByTitleProjection {
  title: string;
}

export interface UserGameRatingProjection {
  rating: number;
  game: Game;
}

export interface UsersGameRatingProjection {
  rating: number;
  user: User;
}

export interface Category {
  id: number;
  category: string;
}

export interface Designer {
  id: number;
  name: string;
}

export interface Diary {
  id: number;
  title: string;
  text: string;
  publicationTime: Date;
  game: Game;
  user: User;
}

export interface DiaryComment {
  id: number;
  comment: string;
  commentTime: Date;
  diary: Diary;
  user: User;
}

export interface DiaryRating {
  id: number;
  rating: number;
  diary: Diary;
  user: User;
}

export interface Expansion {
  id: number;
  parentGame: Game;
  daughterGame: Game;
}

export interface File {
  id: number;
  game: Game;
  user: User;
  file: any;
}

export interface Forum {
  id: number;
  title: string;
  text: string;
  publicationTime: Date;
  game: Game;
  user: User;
}

export interface ForumMessage {
  id: number;
  forum: Forum;
  comment: string;
  user: User;
  time: Date;
}

export interface ForumRating {
  id: number;
  forum: Forum;
  user: User;
  rating: number;
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

export interface GameByDesigner {
  id: number;
  designer: Designer;
  game: Game;
}

export interface GameCategory {
  id: number;
  category: Category;
  game: Game;
}

export interface GameSell {
  id: number;
  condition: string;
  price: number;
  comment: string;
  user: User;
  game: Game;
}

export interface Image {
  id: number;
  image: any;
}

export interface ImageBinder {
  id: number;
  news: News;
  diary: Diary;
  user: User;
  forum: ForumMessage;
  image: Image;
  game: Game;
}

export interface Messenger {
  id: number;
  text: string;
  isRed: boolean;
  messageTime: Date;
  userTo: User;
  userFrom: User;
}

export interface News {
  id: number;
  title: string;
  text: string;
  user: User;
  game: Game;
  publicationTime: Date;
}

export interface NewsComment {
  id: number;
  comment: string;
  commentTime: Date;
  user: User;
  news: News;
}

export interface NewsRating {
  id: number;
  rating: number;
  news: News;
  user: User;
}

export interface RatingGameByUser {
  id: number;
  rating: number;
  user: User;
  game: Game;
}

export interface SameGame {
  id: number;
  referenceGame: Game;
  sourceGame: Game;
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

export interface UserOwnGame {
  id: number;
  game: Game;
  user: User;
}

export interface UserRating {
  id: number;
  comment: string;
  evaluatingUser: User;
  evaluatedUser: User;
  rating: number;
}

export interface UserWish {
  id: number;
  user: User;
  game: Game;
}
