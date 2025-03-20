import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { PetListComponent } from '../components/petList/petList.component';
import { PetService } from '../service/pet.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Pet } from '../model/pet';
import { debounceTime, distinctUntilChanged, filter} from 'rxjs';

@Component({
    selector: 'app-pets',
    imports: [
        MatInputModule,
        MatFormFieldModule,
        MatIconModule,
        PetListComponent,
        FormsModule,
        ReactiveFormsModule,
    ],
    providers: [PetService],
    templateUrl: './pets.component.html',
    styleUrl: './pets.component.scss',
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
