
export interface DesignerDTO {
  id: number;
  designer: string;
}

export interface DiaryCommentDTO {
  id: number;
  comment: string;
  time: Date;
  user: UserDTO;
}

export interface DiaryDTO extends Serializable {
  id: number;
  title: string;
  text: string;
  publicationTime: Date;
  game: GameDTO;
  user: UserDTO;
}

export interface DiaryDataDTO {
  diary: DiaryDTO;
  rating: number | null;
}

export interface DiaryRatingDTO extends Serializable {
  id: number;
  rating: number;
}

export interface FilterGamesDTO {
  id: number;
  title: string;
}

export interface ForumDTO extends Serializable {
  id: number;
  title: string;
  text: string;
  publicationTime: Date;
  game: GameDTO;
  user: UserDTO;
}

export interface ForumDataDTO {
  forum: ForumDTO;
  rating: number;
}

export interface ForumMessageDTO {
  id: number;
  message: string;
  messageTime: Date;
  user: UserDTO;
}

export interface GameDTO extends Serializable {
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

export interface GameDataDTO {
  game: GameDTO;
  rating: number;
  designers: string[];
}

export interface GameSellDTO {
  game: GameDTO;
  condition: string;
  comment: string;
  price: number;
}

export interface RatingGameByUserDTO extends Serializable {
  id: number;
  rating: number;
}

export interface UserDTO extends Serializable {
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

export interface Serializable {
}
