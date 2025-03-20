import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { PetService} from '../../../../services/petService/pet.service';
import { Pet } from '../../model/pet';

@Component({
  selector: 'app-pet-card',
  imports: [MatCardModule],
  templateUrl: './pet-card.component.html',
  styleUrl: './pet-card.component.scss'
})
export class PetCardComponent {
  @Input() pet!: Pet;

}
