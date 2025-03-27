import { Component, Input, OnInit, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { AgendamentoService } from '@services/agendamentoService/agendamento.service';
import { Agendamento } from '@app/models/agendamento.model';

import moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reagendamento',
  imports: [DatePickerModule, FormsModule],
  providers: [AgendamentoService],
  templateUrl: './reagendamento.component.html',
  styleUrl: './reagendamento.component.css'
})
export class ReagendamentoComponent implements OnInit {
    agendamento!: Agendamento;
    //salvarAgendamento = output<string>();
    @Input()
    set id(id: any) {
        this.agendamentoService.getAgendamentoById(id).subscribe((agendamento) => {
            this.agendamento = agendamento;
            this.data = agendamento.data;
            console.log('Agendamento loaded:', agendamento.data);
        });
    }

    constructor(private agendamentoService: AgendamentoService, private router: Router) {}

    ngOnInit(): void {
        this.agendamentoService.getAgendamentoById(this.id).subscribe((agendamento) => {
            this.agendamento = agendamento;
            this.data = agendamento.data;
        });
    }

    data: Date | undefined | string;

    salvar() {
        //this.salvarAgendamento.emit(moment(this.data).format('DD/MM/YYYY HH:mm'));
        //console.log(moment(this.data).format('DD/MM/YYYY HH:mm'));
        this.agendamentoService.reagendarAgendamento(this.agendamento.id, moment(this.data).format('DD/MM/YYYY HH:mm')).subscribe();
        this.router.navigate(['/agendamentos']);
    }
}
