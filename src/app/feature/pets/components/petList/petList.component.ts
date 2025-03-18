
import { Component } from '@angular/core';

import { PetCardComponent } from '../pet-card/pet-card.component';
import { PetService } from '../../service/pet.service';
import { Pet } from '../../model/pet';

@Component({
  selector: 'app-petList',
  imports: [PetCardComponent],
  providers: [PetService],
  templateUrl: './petList.component.html',
  styleUrl: './petList.component.scss'
})
export class PetListComponent {
  constructor(private petService: PetService) {
    this.petService = petService;
  }

  pets: Pet[] = [];

  ngOnInit(): void {
    this.petService.getAllPets().subscribe(res => this.pets = res);
  }
}
