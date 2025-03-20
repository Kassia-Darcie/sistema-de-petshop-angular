import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pet } from '../../feature/pets/model/pet';
import { Injectable } from '@angular/core';
import { filter, map, switchMap, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  private readonly baseUrl = "http://localhost:8080/api";

  constructor(private http: HttpClient) { }

  getAllPets(): Observable<Pet[]> {
    return this.http.get<Pet[]>(this.baseUrl + `/pets`);
  }
}
