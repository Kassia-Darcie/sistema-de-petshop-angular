import { PetService } from '@services/petService/pet.service';
import { Component, inject, Input, NgModule, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';

import { Pet } from '../../../../models/pet';
import { DataViewModule } from 'primeng/dataview';
import { PetCardComponent } from '../pet-card/pet-card.component';
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-petList',
  imports: [PetCardComponent, DataViewModule, ButtonModule, RouterLink],
  providers: [PetService],
  templateUrl: './petList.component.html',
  styleUrls: ['../../../../../styles.css', './petList.component.css']
})
export class PetListComponent {
  @Input()
  pets: Pet[] = [];
  petService = inject(PetService);

  ngOnInit(): void {
    this.petService.getAllPets().subscribe(
        pets => this.pets = pets
    );

    console.log('Pets:', this.pets);
  }



  showDetails(id: string) {
    console.log('Show details of pet with id:', id);
  }
}
