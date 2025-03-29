import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { Agendamento } from '@app/models/agendamento.model';
import { AgendamentoService } from '@app/services/agendamentoService/agendamento.service';
import { debounceTime, distinctUntilChanged, filter, map, Observable, startWith, Subject, takeUntil } from 'rxjs';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { SelectChangeEvent, SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { IconField } from 'primeng/iconfield';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { InputIcon } from 'primeng/inputicon';
import { FluidModule } from 'primeng/fluid';
import { InputTextModule } from 'primeng/inputtext';

@Component({
    selector: 'app-agendamentos',
    imports: [
        TableModule,
        TagModule,
        RatingModule,
        ButtonModule,
        CommonModule,
        RouterLink,
        SelectModule,
        DatePickerModule,
        ToastModule,
        IconField,
        InputIcon,
        InputTextModule,
        FluidModule,
        ReactiveFormsModule,
    ],
    providers: [AgendamentoService, MessageService],
    templateUrl: './agendamentos.component.html',
    styleUrl: './agendamentos.component.css',
})
export class AgendamentosComponent implements OnInit, OnDestroy {
    agendamentos$!: Observable<Agendamento[]>;
    private destroy$ = new Subject<void>();
    statusOptions = [
        {
            label: 'Agendado',
            value: 'AGENDADO',
        },
        {
            label: 'Pendente',
            value: 'PENDENTE',
        },
        {
            label: 'Cancelado',
            value: 'CANCELADO',
        },
    ];
    tiposServico = [
        {
            label: 'Banho',
            value: 'BANHO',
        },
        {
            label: 'Tosa',
            value: 'TOSA',
        },
        {
            label: 'Banho e Tosa',
            value: 'BANHO_TOSA',
        },
        {
            label: 'Consulta',
            value: 'CONSULTA',
        },
        {
            label: 'Vacina',
            value: 'VACINA',
        },
        {
            label: 'Medicação',
            value: 'MEDICACAO',
        },
    ];
    inputDeBusca = new FormControl('');

    constructor(
        private agendamentoService: AgendamentoService,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this.agendamentos$ = this.agendamentoService.agendamentos$;
        this.agendamentoService.getAllAgendamentos(null).subscribe();

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
                                this.agendamentos$ = this.agendamentoService.getAllAgendamentos({pet: nomePet || ''}).pipe(
                                    map((agendamentos: Agendamento[]) => {
                                        return agendamentos.filter(agendamento => agendamento.pet.petName.toLowerCase().includes(nomePet!.toLowerCase()));
                                    }));
                            });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    getSeverity(status: string) {
        switch (status) {
            case 'AGENDADO':
                return 'success';
            case 'PENDENTE':
                return 'warn';
            case 'CANCELADO':
                return 'danger';
            default:
                return 'info';
        }
    }

    cancelarAgendamento(id: string) {
        this.agendamentoService.cancelarAgendamento(id).subscribe({
            next: () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Sucesso',
                    detail: 'Agendamento cancelado',
                });
            },
            error: (error) => {
                console.error('Erro ao cancelar agendamento:', error);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erro',
                    detail: 'Falha ao cancelar agendamento',
                });
            },
        });
    }

    onStatusChange($event: SelectChangeEvent) {
        const status: string = $event.value;
        console.log('Status selecionado:', status);
        this.agendamentoService.getAllAgendamentos({status}).subscribe();
    }

    onTipoChange($event: SelectChangeEvent) {
        const tipo: string = $event.value;
        console.log('Tipo selecionado:', tipo);
        this.agendamentos$ = this.agendamentoService.getAllAgendamentos(null).pipe(map((agendamentos: Agendamento[]) => {
            return agendamentos.filter(agendamento => agendamento.cuidados.includes(tipo));
        }));

    }

    reagendar() {
        console.log('Reagendar');
    }
}
