import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PetService } from '@services/petService/pet.service';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DataViewModule } from 'primeng/dataview';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { Observable, Subject } from 'rxjs';
import {
    debounceTime,
    distinctUntilChanged,
    filter,
    takeUntil,
} from 'rxjs/operators';

import { Pet } from '@models/pet';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { SelectModule } from 'primeng/select';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-petList',
    imports: [
        DataViewModule,
        IconField,
        InputIcon,
        InputTextModule,
        ButtonModule,
        RouterLink,
        AsyncPipe,
        CommonModule,
        TableModule,
        CardModule,
        TagModule,
        SelectModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [PetService, AsyncPipe],
    templateUrl: './petList.component.html',
    styleUrls: ['../../../../../styles.css', './petList.component.css'],
})
export class PetListComponent implements OnInit, OnDestroy {
    pets$!: Observable<Pet[]>;
    especies = [{ nome: 'Cachorro' }, { nome: 'Gato' }];
    petService = inject(PetService);
    inputDeBusca = new FormControl('');
    selectedEspecie: any = '';
    private destroy$ = new Subject<void>();

    ngOnInit(): void {
        this.pets$ = this.petService.pets$;
        this.petService.getAllPets().subscribe();

        this.inputDeBusca.valueChanges
            .pipe(
                debounceTime(300),
                distinctUntilChanged(),
                filter(
                    (nomePet) => nomePet!.length > 2 || nomePet!.length === 0
                )
            )
            .subscribe((nomePet) => {
                console.log('Valor do input de busca: ', nomePet);
                this.petService.getAllPets({ nome: nomePet || '' }).subscribe();
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    showDetails(id: string) {}

    filtrarPorEspecie(event) {
        if (this.selectedEspecie) {
            const especie = this.selectedEspecie.nome;
            this.petService.getAllPets({ especie: especie }).subscribe();
            console.log('Especie selecionada: ', this.selectedEspecie);
        } else {
            this.petService.getAllPets().subscribe();
        }
    }

    /* buscarPet($event: Event) {
        console.log('Valor do input de busca: ', this.inputDeBusca);
        if (this.inputDeBusca.length > 2 || this.inputDeBusca.length === 0) {
            this.petService.getAllPets({ nome: this.inputDeBusca }).subscribe();
        }
    } */

    private updateList() {
        this.petService.pets$.pipe(takeUntil(this.destroy$)).subscribe();
    }

    private loadPets() {
        this.pets$ = this.petService.pets$;
        this.petService.getAllPets().subscribe();
    }
}
