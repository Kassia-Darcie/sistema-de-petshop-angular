import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Pet } from '../../models/pet';
import { Injectable } from '@angular/core';
import { Observable, switchMap, map } from 'rxjs';

interface PetFilter {
    nome: string;
    raca: string;
    especie: string;
}
@Injectable({
  providedIn: 'root'
})
export class PetService {
  private readonly baseUrl = "http://localhost:8080/api";

  constructor(private http: HttpClient) { }

  getAllPets(): Observable<Pet[]> {
    return this.http.get<Pet[]>(this.baseUrl + `/pets`);
  }

  getPetById(id: string): Observable<Pet> {
    return this.http.get<Pet>(this.baseUrl + `/pets/${
        id}`);
  }

  savePet(pet: Partial<Pet>) {
    return this.http.post<string>(this.baseUrl + `/pets`, pet);
  }

  updatePet(pet: Pet) {
    return this.http.put(this.baseUrl + `/pets/${pet.id}`, pet);
  }

  deletePet(id: string) {
    return this.http.delete(this.baseUrl + `/pets/${
        id}`);
    }

  async getPetBreeds(specie: 'Cachorro' | 'Gato'): Promise<string[]> {
    let breedsNames: string[] = [];
    let res, data;
    switch (specie) {
      case 'Cachorro':

        res = await fetch('https://api.thedogapi.com/v1/breeds');
        data = await res.json();
        breedsNames = data.map((breed: any) => breed.name);
        break;
      case 'Gato':

        res = await fetch('https://api.thecatapi.com/v1/breeds');
        data = await res.json();
        breedsNames = data.map((breed: any) => breed.name);
        break;
    }

    return breedsNames;
  }
}
