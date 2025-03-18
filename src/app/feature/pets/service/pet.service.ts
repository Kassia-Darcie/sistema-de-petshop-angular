import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pet } from '../model/pet';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  private readonly baseUrl = "http://localhost:8080/api";

  constructor(private http: HttpClient) { }

  getAllPets(filtro: string) {
    return this.http.get<Pet[]>(this.baseUrl + `/pets`);
  }
}
