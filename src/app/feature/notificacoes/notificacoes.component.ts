import { AsyncPipe, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Notificacao } from '@app/models/notificacao.model';
import { NotificacaoService } from '@app/services/notificacao.service';
import moment from 'moment';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { debounceTime, distinctUntilChanged, filter, Observable, Subject } from 'rxjs';


@Component({
    selector: 'app-notificacoes',
    imports: [
        TagModule,
        SelectModule,
        TableModule,
        FormsModule,
        DatePipe,
        AsyncPipe,
        ButtonModule,
        IconFieldModule,
        InputIcon,
        ReactiveFormsModule,
        InputTextModule
    ],
    providers: [NotificacaoService],
    templateUrl: './notificacoes.component.html',
    styleUrl: './notificacoes.component.css',
})
export class NotificacoesComponent {
    notificacoes$!: Observable<Notificacao[]>;
    private destroy$ = new Subject<void>();
    teste = new Date();
    carregando = false;
    totalRegistros = 0;

    filtros = {
        pet: new FormControl(''),
        tipo: new FormControl(''),
        status: new FormControl(''),
    };

    statusOptions = [
        { label: 'Enviado', value: 'ENVIADO' },
        { label: 'Pendente', value: 'PENDENTE' },
        { label: 'Falha', value: 'FALHA' },
    ];

    tiposNotificacao = [
        { label: 'Vacina', value: 'VACINA' },
        { label: 'Consulta', value: 'CONSULTA' },
        { label: 'Banho e tosa', value: 'BANHO_E_TOSA' },
    ];

    constructor(private notificacaoService: NotificacaoService) {}

    ngOnInit(): void {
        this.notificacoes$ = this.notificacaoService.notificacoes$;
        this.notificacaoService.listar(null).subscribe();

        this.filtros.pet.valueChanges
                    .pipe(
                        debounceTime(300),
                        distinctUntilChanged(),
                        filter(
                            (nomePet) => nomePet!.length > 2
                        )
                    )
                    .subscribe((nomePet) => {
                        console.log('Valor do input de busca: ', nomePet);
                        this.notificacaoService.listar({pet: this.filtros.pet.value}).subscribe();
                    });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }



    aplicarFiltros(): void {
        this.notificacaoService.listar(null).subscribe({
            next: (notificacoes) => {
                this.notificacoes$ = this.notificacaoService.notificacoes$;

            },
            error: () => {
            },
        });
    }

    getSeveridadeStatus(
        status: string
    ): 'success' | 'warn' | 'danger' | 'info' {
        switch (status) {
            case 'ENVIADO':
                return 'success';
            case 'PENDENTE':
                return 'warn';
            case 'FALHA':
                return 'danger';
            default:
                return 'info';
        }
    }

    marcarComoLida(notificacao: Notificacao): void {
        this.notificacaoService.marcarComoLida(notificacao.id).subscribe({
            next: () => {
                notificacao.lida = true;
            },
        });
    }

    solicitarReenvio(notificacao: Notificacao): void {
        this.notificacaoService.reenviar(notificacao.id).subscribe({
            next: () => {
                notificacao.status = 'PENDENTE';
            },
        });
    }

    convertToDate(dateString: string): Date {
        return moment(dateString).toDate();
    }
}
