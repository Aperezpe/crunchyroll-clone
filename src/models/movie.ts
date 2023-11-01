export interface Movie {
  id: number,
  sub: boolean,
  dub: boolean,
  title: string,
  titleImgUrl: string,
  imgUrl: string,
  genres: string,
  type: string // Post, VideoGame, Movie, Show
}