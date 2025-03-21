import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs';
import { InputIcon } from 'primeng/inputicon';
import { IconField } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Fluid, FluidClasses, FluidModule } from 'primeng/fluid';
import { PetService } from '../../../services/petService/pet.service';
import { PetListComponent } from '../components/petList/petList.component';
import { Pet } from '../model/pet';

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
        Fluid
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
