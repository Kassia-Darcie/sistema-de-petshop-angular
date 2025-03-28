import { Component, OnDestroy, OnInit } from '@angular/core';
import { Agendamento } from '@app/models/agendamento.model';
import { AgendamentoService } from '@app/services/agendamentoService/agendamento.service';
import { Observable, startWith, Subject, takeUntil } from 'rxjs';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

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
        ToastModule
    ],
    providers: [AgendamentoService, MessageService],
    templateUrl: './agendamentos.component.html',
    styleUrl: './agendamentos.component.css',
})
export class AgendamentosComponent implements OnInit, OnDestroy {
    agendamentos$!: Observable<Agendamento[]>;
    private destroy$ = new Subject<void>();
    statusOptions: any[] | undefined;
    tiposServico: any[] | undefined;

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
                    detail: 'Agendamento cancelado'
                  });
            },
            error: (error) => {
                console.error('Erro ao cancelar agendamento:', error);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erro',
                    detail: 'Falha ao cancelar agendamento'
                  });
            },
        });
    }

    reagendar() {
        console.log('Reagendar');
    }

    private updateList() {
        this.agendamentoService.agendamentos$
            .pipe(takeUntil(this.destroy$))
            .subscribe();
    }

    private loadAgendamentos() {
        this.agendamentoService.getAllAgendamentos().subscribe();
    }
}
