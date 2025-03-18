import { Component, Input } from '@angular/core';

import { Pet } from '../../model/pet';
import { PetCardComponent } from '../pet-card/pet-card.component';


@Component({
  selector: 'app-petList',
  imports: [PetCardComponent],
  templateUrl: './petList.component.html',
  styleUrl: './petList.component.scss'
})
export class PetListComponent {
  @Input()
  pets: Pet[] = [];
}
