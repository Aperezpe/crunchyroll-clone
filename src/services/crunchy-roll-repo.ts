import { CrunchyRollElement } from "../models/movie";
import { HttpResponse, get } from "../utilities/http-request";

export class CrunchyRollService {
  // TODO: make any necessary configurations here to connect to backend

  private baseUrl: string; 

  constructor() {
    this.baseUrl = import.meta.env.DEV ? "http://localhost:3000" : ''
  }

  getSlideShowData(): Promise<HttpResponse<CrunchyRollElement[]>> {
    return get<CrunchyRollElement[]>(`${this.baseUrl}/slideShowMovies`)
  }
}