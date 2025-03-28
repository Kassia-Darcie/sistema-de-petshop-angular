import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { AgendamentoService } from '@services/agendamentoService/agendamento.service';
import { PetService } from '@services/petService/pet.service';
import { MessageService } from 'primeng/api';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { Agendamento } from '@app/models/agendamento.model';

interface PetOption {
    label: string;
    value?: string ;
}

@Component({
    selector: 'app-novo-agendamento',
    imports: [
        ReactiveFormsModule,
        FormsModule,
        DropdownModule,
        CalendarModule,
        InputNumberModule,
        TextareaModule,
        ButtonModule,
        ToastModule,
    ],
    providers: [AgendamentoService, PetService, MessageService],
    templateUrl: './novo-agendamento.component.html',
    styleUrl: './novo-agendamento.component.css',
})
export class NovoAgendamentoComponent implements OnInit {
    tiposServico = [
        { label: 'Vacinação', value: 'VACINACAO' },
        { label: 'Banho e Tosa', value: 'BANHO_TOSA' },
        { label: 'Consulta Veterinária', value: 'CONSULTA' },
        { label: 'Medicação', value: 'MEDICACAO' },
    ];
    agendamentoForm = new FormGroup({
        cuidado: new FormControl('', [Validators.required]),
        pet: new FormControl({}, [Validators.required]),
        dataHora: new FormControl('', [Validators.required]),
    });
    pets!: PetOption[];
    minDate: Date | null | undefined;

    constructor(
        private agendamentoService: AgendamentoService,
        private petService: PetService,
        private messageService: MessageService
    ) {
        this.minDate = new Date();
    }

    ngOnInit(): void {
        this.petService.getAllPets().subscribe((pets) => {
            this.pets = pets.map((pet) => ({
                label: pet.nome,
                value: pet.id,
            }));
        });
    }

    onSubmit() {
        console.log(this.agendamentoForm.value);
        if (this.agendamentoForm.invalid) {
            this.messageService.add({
                severity: 'error',
                summary: 'Erro',
                detail: 'Preencha todos os campos obrigatórios.',
            });
            return;
        }
        const agendamento: Partial<Agendamento> = {
            cuidados: this.agendamentoForm.value.cuidado
                ? [this.agendamentoForm.value.cuidado]
                : [],
            data: this.agendamentoForm.value.dataHora || undefined,
        };
        const pet = this.agendamentoForm.value.pet as PetOption;
        if (!pet.value) {
            this.messageService.add({
                severity: 'error',
                summary: 'Erro',
                detail: 'Pet inválido.',
            });
            return;
        }
        this.agendamentoService
            .saveAgendamento(agendamento, pet.value)
            .subscribe({
                next: (res) => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Agendamento criado com sucesso!',
                        detail: res,
                    });
                },
            });
    }
}
