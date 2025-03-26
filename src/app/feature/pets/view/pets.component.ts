import { Component, inject, SimpleChanges } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs';

import { PetService } from '@services/petService/pet.service';
import { PetListComponent } from '../components/petList/petList.component';
import { Pet } from '@models/pet';

@Component({
    selector: 'app-pets',
    imports: [
        InputIcon,
        IconField,
        InputTextModule,
        PetListComponent,
        ReactiveFormsModule,
        RouterOutlet,
        RouterLink,
    ],
    providers: [PetService],
    templateUrl: './pets.component.html',
    styleUrl: './pets.component.css',
})
export class PetsComponent {
    pets: Pet[] = [];
    allPets: Pet[] = [];
    searchControl = new FormControl('');

    constructor(private router: Router, private petService: PetService) {}

    ngOnInit(): void {
        this.petService.pets$.subscribe((pets) => {
            this.pets = pets;
            this.allPets = pets;
        });

        this.loadPets();

        this.searchControl.valueChanges
            .pipe(
                debounceTime(300),
                distinctUntilChanged(),
                filter(
                    (nomePet) => nomePet!.length > 2 || nomePet!.length === 0
                )
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

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['pets'] && changes['pets'].currentValue) {
            this.loadPets();
            console.log('Pets changed com:', changes['pets'].currentValue);
        }
    }

    loadPets(): void {
        this.petService.getAllPets().subscribe((pets) => {
            this.pets = pets;
            this.allPets = pets;
        });
    }
}
