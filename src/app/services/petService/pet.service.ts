import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, Subject, tap, throwError } from 'rxjs';

import { Pet } from '../../models/pet';

interface PetFilter {
    nome?: string;
    raca?: string;
    especie?: string;
}
@Injectable({
    providedIn: 'root',
})
export class PetService {
    private readonly baseUrl = 'http://localhost:8080/api';
    private petsSubject = new BehaviorSubject<Pet[]>([]);
    pets$ = this.petsSubject.asObservable();

    constructor(private http: HttpClient) {}

    updatePetsList(pets: Pet[]) {
        this.petsSubject.next(pets);
    }

    addPetToList(pet: Pet) {
        this.petsSubject.next([...this.petsSubject.value, pet]);
    }

    getAllPets(filters?: PetFilter): Observable<Pet[]> {
        return this.http.get<Pet[]>(this.baseUrl + `/pets`, {
            params: filters as HttpParams,
        }).pipe(
            tap((pets) => {
                this.petsSubject.next(pets);
            }),
            catchError((error) => {
                console.error('Erro ao carregar pets:', error);
                return throwError(() => error);
            })
        );
    }

    getPetById(id: string): Observable<Pet> {
        return this.http.get<Pet>(this.baseUrl + `/pets/${id}`);
    }

    savePet(pet: Partial<Pet>): Observable<string> {
        return this.http.post<string>(this.baseUrl + `/pets`, pet).pipe(
            tap((res) => {
                this.notificarAtualizacoes();
            })
        );
    }

    updatePet(pet: Pet) {
        return this.http.put(this.baseUrl + `/pets/${pet.id}`, pet).pipe(
            tap((res) => {
                this.notificarAtualizacoes();
            })
        );
    }

    deletePet(id: string) {
        return this.http.delete(this.baseUrl + `/pets/${id}`).pipe(
            tap(() => {
                this.notificarAtualizacoes();
            })
        );
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

    private notificarAtualizacoes() {
        this.getAllPets().subscribe({
            next: (pets) => {
                this.petsSubject.next(pets);
            },
            error: (error) => {
                console.error('Erro ao carregar pets:', error);
            },
        });
    }
}
