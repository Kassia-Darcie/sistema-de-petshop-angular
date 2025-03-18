import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pet } from '../model/pet';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  constructor(private http: HttpClient) { }

  getAllPets() {
    return this.http.get<Pet[]>("http://localhost:8080/api/pets");
  }
}
