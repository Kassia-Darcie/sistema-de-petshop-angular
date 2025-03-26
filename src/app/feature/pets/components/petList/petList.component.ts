import { PetService } from '@services/petService/pet.service';
import {
    Component,
    inject,
    Input,
    NgModule,
    OnDestroy,
    OnInit,
    Signal,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';

import { Pet } from '../../../../models/pet';
import { DataViewModule } from 'primeng/dataview';
import { PetCardComponent } from '../pet-card/pet-card.component';
import { ROUTER_OUTLET_DATA, RouterLink } from '@angular/router';
import { Subject } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-petList',
    imports: [PetCardComponent, DataViewModule, ButtonModule, RouterLink],
    providers: [PetService],
    templateUrl: './petList.component.html',
    styleUrls: ['../../../../../styles.css', './petList.component.css'],
})
export class PetListComponent implements OnInit, OnDestroy {
    pets: Pet[] = [];
    petService = inject(PetService);
    private destroy$ = new Subject<void>();

    ngOnInit(): void {
        this.loadPets();
        this.updateList();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    showDetails(id: string) {
        console.log('Show details of pet with id:', id);
    }

    private updateList() {
        this.petService.pets$.pipe(
            takeUntil(this.destroy$),
            startWith(null)
        ).subscribe(
            () => this.loadPets()
        );
    }

    private loadPets() {
        this.petService.getAllPets().subscribe(
            (pets) => this.pets = pets
        );
    }
}
