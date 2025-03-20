import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs';

import { PetService } from '../../../services/petService/pet.service';
import { PetListComponent } from '../components/petList/petList.component';
import { Pet } from '../model/pet';

@Component({
    selector: 'app-pets',
    imports: [
        PetListComponent,
        ReactiveFormsModule,
        RouterOutlet
    ],
    providers: [PetService],
    templateUrl: './pets.component.html',
    styleUrl: './pets.component.css',
})
export class PetsComponent {
    pets: Pet[] = [];
    allPets: Pet[] = [];
    searchControl = new FormControl('');

    constructor(private petService: PetService) {
        this.petService = petService;
    }

    ngOnInit(): void {
        this.petService.getAllPets().subscribe((res) => {
            this.pets = res;
            this.allPets = res;
        });

        this.searchControl.valueChanges
            .pipe(
                debounceTime(300),
                distinctUntilChanged(),
                filter((nomePet) => nomePet!.length > 2 || nomePet!.length === 0)
            )
            .subscribe((nomePet) => {
                if (!nomePet || nomePet.trim() === '') {
                    this.pets = [...this.allPets];
                } else {
                    this.pets = this.allPets.filter((pet) =>
                        pet.nome.toLowerCase().includes(nomePet.toLowerCase())
                    );
                }
            });
    }
}
