import {HttpHeaders} from "@angular/common/http";

export const api = {
  Gateway: 'http://localhost:8090',
  SignUp: 'sign-up',
  SignIn: 'sign-in',
  Users: 'users',
  Games: 'games',
  AddGame: 'add',
  SimilarGames: 'similar',
  Expansions: 'expansions',
  GameById: 'get-game',
  Diaries: 'diaries',
  Forums: 'forum',
  Diary: 'diaries',
  UserAvatar: 'upload-avatar',
  GameAvatar: 'upload-image',
  GamesRating: 'games-rating',
  GamesToSell: 'games-to-sell',
  GamesByFilter: 'get-games-by-filter',
  HttpOptions: {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }
};
