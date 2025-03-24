import { Component, Input } from '@angular/core';

import { Pet } from '../../../../models/pet';

@Component({
  selector: 'app-pet-card',
  imports: [],
  templateUrl: './pet-card.component.html',
  styleUrl: './pet-card.component.css'
})
export class PetCardComponent {
  @Input() pet!: Pet;

}
