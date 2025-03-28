import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { Agendamento } from '@app/models/agendamento.model';
import { AgendamentoService } from '@app/services/agendamentoService/agendamento.service';
import { filter, map, Observable, startWith, Subject, takeUntil } from 'rxjs';
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
import { a } from 'node_modules/@angular/core/navigation_types.d-u4EOrrdZ';

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
            value: 'BANHO_E_TOSA',
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
        this.agendamentoService.getAllAgendamentos().subscribe();
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
        this.agendamentos$ = this.agendamentoService.getAllAgendamentos().pipe(
            filter((agendamentos, i) => agendamentos[i].status === status)
        );
    }

    onTipoChange($event: SelectChangeEvent) {
        const tipo: string = $event.value;
        console.log('Tipo selecionado:', tipo);
        this.agendamentos$ = this.agendamentoService.getAllAgendamentos().pipe(
            map((agendamentos) => agendamentos.filter((agendamento) => agendamento.cuidados.includes(tipo) ))
        );

    }

    reagendar() {
        console.log('Reagendar');
    }
}
