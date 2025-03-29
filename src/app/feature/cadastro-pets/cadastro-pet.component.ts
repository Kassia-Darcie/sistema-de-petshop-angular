import { Pet } from '../../models/pet';
import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import {
    ReactiveFormsModule,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { PetService } from '@services/petService/pet.service';

import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule, SelectChangeEvent } from 'primeng/select';
import {
    AutoCompleteModule,
    AutoCompleteCompleteEvent,
} from 'primeng/autocomplete';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { IftaLabelModule } from 'primeng/iftalabel';
import { TextareaModule } from 'primeng/textarea';
import { DialogModule } from 'primeng/dialog';

import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { FluidModule } from 'primeng/fluid';

const P_COMPONENTS = [
    CardModule,
    InputTextModule,
    SelectModule,
    AutoCompleteModule,
    InputNumberModule,
    ButtonModule,
    IftaLabelModule,
    TextareaModule,
    DialogModule,
    FluidModule,
];

@Component({
    selector: 'app-cadastro-pet',
    imports: [...P_COMPONENTS, ReactiveFormsModule],
    providers: [PetService, ConfirmationService],
    templateUrl: './cadastro-pet.component.html',
    styleUrl: './cadastro-pet.component.css',
})
export class CadastroPetComponent implements OnInit {
    petsForm = new FormGroup({
        nome: new FormControl('', [
            Validators.required,
            Validators.minLength(2),
        ]),
        especie: new FormControl('', [Validators.required]),
        raca: new FormControl('', [Validators.required]),
        idade: new FormControl('', [Validators.required]),
        peso: new FormControl('', [Validators.required]),
        tutor: new FormControl('', [Validators.required]),
        emailTutor: new FormControl('', [
            Validators.required,
            Validators.email,
        ]),
        descricao: new FormControl('', [Validators.required]),
        cor: new FormControl('', [Validators.required]),
    });

    especies = ['Cachorro', 'Gato'];
    racas: WritableSignal<string[]> = signal([]);
    racasGato: string[] = [];
    filteredItems: string[] = [];
    petId?: string;
    visible: boolean = false;

    constructor(private petService: PetService, private router: Router) {}

    ngOnInit(): void {
        this.petsForm.controls['raca'].disable();
    }

    filterItems(event: AutoCompleteCompleteEvent) {
        let filtered: string[] = [];
        let query = event.query;

        for (let i = 0; i < (this.racas() as any[]).length; i++) {
            let item = (this.racas() as string[])[i];
            if (item.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(item);
            }
        }

        this.filteredItems = filtered;
    }

    onEspecieSelect(event: SelectChangeEvent): void {
        const especie: string = event.value;
        this.petsForm.value.especie = especie;
        if (especie === 'Cachorro') {
            this.petService.getPetBreeds('Cachorro').then((res) => {
                this.racas.set(res);
                this.filteredItems = res;
            });
        } else {
            this.petService.getPetBreeds('Gato').then((res) => {
                this.racas.set(res);
                this.filteredItems = res;
            });
        }
        this.petsForm.controls['raca'].enable();
    }

    handleSubmit(): void {
        const pet: Partial<Pet> = {
            ...(this.petsForm.value as Partial<Pet>),
        };
        this.petService.savePet(pet).subscribe({
            next: (res) => {
                this.petId = res.id;
                this.petsForm.reset();
                this.visible = true;
            },
            error: (err) => {
                console.error('Erro ao salvar pet:', err);
            },
        });


    }

    verDetalhes() {
        this.router.navigate(['/pets', this.petId],{replaceUrl: true});
    }
}
