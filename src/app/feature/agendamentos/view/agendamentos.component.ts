import { Component, OnDestroy, OnInit } from '@angular/core';
import { Agendamento } from '@app/models/agendamento.model';
import { AgendamentoService } from '@app/services/agendamentoService/agendamento.service';
import { startWith, Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'app-agendamentos',
  imports: [],
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
        this.updateList();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
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
