import { PetService } from '@services/petService/pet.service';
import { Component, inject, Input, NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';

import { Pet } from '../../../../models/pet';
import { DataViewModule } from 'primeng/dataview';
import { PetCardComponent } from '../pet-card/pet-card.component';



@Component({
  selector: 'app-petList',
  imports: [PetCardComponent, DataViewModule, ButtonModule],
  providers: [PetService],
  templateUrl: './petList.component.html',
  styleUrls: ['../../../../../styles.css', './petList.component.css']
})
export class PetListComponent {
  @Input()
  pets: Pet[] = [];
  petService = inject(PetService);

  editPet(id: string) {
    console.log('Edit pet with id:', id);
  }

  deletePet(id: string) {
    this.petService.deletePet(id).subscribe(
        res => console.log('Pet deleted:'),
    )
  }
}
