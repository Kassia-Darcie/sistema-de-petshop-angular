import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PetService } from '@services/petService/pet.service';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DataViewModule } from 'primeng/dataview';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Pet } from '@models/pet';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { SelectModule } from 'primeng/select';
import { FormControl, FormsModule } from '@angular/forms';

@Component({
    selector: 'app-petList',
    imports: [DataViewModule, ButtonModule, RouterLink, AsyncPipe, CommonModule, TableModule, CardModule, TagModule, SelectModule, FormsModule],
    providers: [PetService, AsyncPipe],
    templateUrl: './petList.component.html',
    styleUrls: ['../../../../../styles.css', './petList.component.css'],
})
export class PetListComponent implements OnInit, OnDestroy {
    pets$!: Observable<Pet[]>;
    especies = [{nome: 'Cachorro'}, {nome: 'Gato'}];
    petService = inject(PetService);
    selectedEspecie = '';
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
    }

    private updateList() {
        this.petService.pets$.pipe(
            takeUntil(this.destroy$)
        ).subscribe();
    }

    private loadPets() {
       this.pets$ = this.petService.pets$;
       this.petService.getAllPets().subscribe();
    }
}
