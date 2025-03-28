import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Agendamento } from '@app/models/agendamento.model';
import { AgendamentoService } from '@services/agendamentoService/agendamento.service';
import moment from 'moment';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'app-reagendamento',
    imports: [DatePickerModule, FormsModule, ToastModule, ButtonModule],
    providers: [AgendamentoService, MessageService],
    templateUrl: './reagendamento.component.html',
    styleUrl: './reagendamento.component.css',
})
export class ReagendamentoComponent implements OnInit {
    agendamento!: Agendamento;
    
    @Input()
    set id(id: any) {
        this.agendamentoService
            .getAgendamentoById(id)
            .subscribe((agendamento) => {
                this.agendamento = agendamento;
                this.data = agendamento.data;
                console.log('Agendamento loaded:', agendamento.data);
            });
    }

    constructor(
        private agendamentoService: AgendamentoService,
        private router: Router,
        private messageService: MessageService,
        private cdr: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.agendamentoService
            .getAgendamentoById(this.id)
            .subscribe((agendamento) => {
                this.agendamento = agendamento;
                this.data = agendamento.data;
            });
    }

    data: Date | undefined | string;
    today: Date = new Date();

    salvar() {

        this.agendamentoService
            .reagendarAgendamento(
                this.agendamento.id,
                moment(this.data).format('DD/MM/YYYY HH:mm')
            )
            .subscribe({
                next: () => {
                    this.messageService.add({
                        key: 'confirm',
                        severity: 'success',
                        summary: 'Sucesso',
                        detail: 'Agendamento reagendado com sucesso',
                      });
                },
                error: (error) => {
                    console.error('Erro ao reagendar:', error);
                    this.messageService.add({
                        key: 'confirm',
                        severity: 'error',
                        summary: 'Erro',
                        detail: 'Falha ao reagendar'
                      });
                },
            });
    }

    onClose( ){
        this.router.navigate(['/agendamentos']);
    }
}
