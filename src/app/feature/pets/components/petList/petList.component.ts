import { Component, Input } from '@angular/core';

import { Pet } from '../../../../models/pet';
import { PetCardComponent } from '../pet-card/pet-card.component';


@Component({
  selector: 'app-petList',
  imports: [PetCardComponent],
  templateUrl: './petList.component.html',
  styleUrl: './petList.component.css'
})
export class PetListComponent {
  @Input()
  pets: Pet[] = [];
}
