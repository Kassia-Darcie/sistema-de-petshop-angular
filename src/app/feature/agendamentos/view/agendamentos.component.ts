import { Component, OnDestroy, OnInit } from '@angular/core';
import { Agendamento } from '@app/models/agendamento.model';
import { AgendamentoService } from '@app/services/agendamentoService/agendamento.service';
import { startWith, Subject, takeUntil } from 'rxjs';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-agendamentos',
  imports: [TableModule, TagModule, RatingModule, ButtonModule, CommonModule, RouterLink],
  providers: [AgendamentoService],
  templateUrl: './agendamentos.component.html',
  styleUrl: './agendamentos.component.css'
})
export class AgendamentosComponent implements OnInit, OnDestroy{
    agendamentos: Agendamento[] = [];
    private destroy$ = new Subject<void>();

    constructor(private agendamentoService: AgendamentoService){}

    ngOnInit(): void {
        this.loadAgendamentos();
        //this.updateList();
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

    reagendar() {
        console.log('Reagendar');
    }

    private updateList() {
            this.agendamentoService.agendamentos$.pipe(
                takeUntil(this.destroy$),
                startWith(null)
            ).subscribe(
                () => this.loadAgendamentos()
            );
        }

        private loadAgendamentos() {
            this.agendamentoService.getAllAgendamentos().subscribe(
                (agendamentos) => this.agendamentos = agendamentos
            );
        }
}
