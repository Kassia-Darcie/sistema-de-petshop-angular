import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { PetListComponent } from '../components/petList/petList.component';
import { PetService } from '../service/pet.service';
import {FormsModule} from '@angular/forms';
import { Pet } from '../model/pet';

@Component({
  selector: 'app-pets',
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    PetListComponent,
    FormsModule
  ],
  providers: [PetService],
  templateUrl: './pets.component.html',
  styleUrl: './pets.component.scss'
})
export class PetsComponent {
  pets: Pet[] = [];
  searchTerm: string = '';

  constructor(private petService: PetService) {
    this.petService = petService;
  }

  ngOnInit(): void {
    this.petService.getAllPets(this.searchTerm).subscribe(res => this.pets = res);
  }

  searchPets(searchTerm: string): void {
    this.petService.getAllPets(this.searchTerm.toLowerCase())
      .subscribe(res => this.pets = res.filter(pet => pet.nome.toLowerCase().includes(searchTerm)));
  }
}
