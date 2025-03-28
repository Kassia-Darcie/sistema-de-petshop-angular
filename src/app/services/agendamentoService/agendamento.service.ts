import { Agendamento } from '@models/agendamento.model';
import { HttpClient } from '@angular/common/http';
import { Injectable  } from '@angular/core';
import { BehaviorSubject, Observable, Subject, tap, catchError, throwError } from 'rxjs';
import moment from 'moment';

@Injectable({
    providedIn: 'root',
})
export class AgendamentoService {
    private readonly baseUrl = 'http://localhost:8080/api/agendamentos';
    private agendamentosSubject = new BehaviorSubject<Agendamento[]>([]);
    agendamentos$ = this.agendamentosSubject.asObservable();

    constructor(private http: HttpClient) {}

    updateAgendamentosList(agendamento: Agendamento[]) {
        this.agendamentosSubject.next(agendamento);
    }

    addAgendamentoToList(agendamento: Agendamento) {
        this.agendamentosSubject.next([
            ...this.agendamentosSubject.value,
            agendamento,
        ]);
    }

    getAllAgendamentos(): Observable<Agendamento[]> {
        return this.http
            .get<Agendamento[]>(this.baseUrl).pipe(
                tap((agendamentos) => {
                  // Atualiza o BehaviorSubject com a nova lista
                  this.agendamentosSubject.next(agendamentos);
                }),
                catchError((error) => {
                  console.error('Erro ao carregar agendamentos:', error);
                  return throwError(() => error);
                })
              );
    }

    getAgendamentoById(id: string): Observable<Agendamento> {
        return this.http.get<Agendamento>(`${this.baseUrl}/${id}`);
    }

    saveAgendamento(agendamento: Partial<Agendamento>, petId: string): Observable<string> {
        agendamento.data = this.convertData(agendamento.data as string);
        return this.http
            .post<string>(this.baseUrl, agendamento, {
                params:{
                    petId: petId,

                },
                responseType: 'text' as 'json',
            })
            .pipe(tap((res) => this.notificarAtualizacoes()));
    }

    updateAgendamento(agendamento: Agendamento) {
        return this.http
            .put(this.baseUrl + agendamento.id, agendamento)
            .pipe(tap(() => this.notificarAtualizacoes()));
    }

    reagendarAgendamento(id: number, data: string) {
        return this.http
            .patch(`${this.baseUrl}/${id}`, null, {
                params: {
                    novoHorario: data,
                },
                responseType: 'text' as 'json',
            })
            .pipe(tap(() => this.notificarAtualizacoes()));
    }

    deleteAgendamento(id: string) {
        return this.http
            .delete(this.baseUrl + id)
            .pipe(tap(() => this.notificarAtualizacoes()));
    }

    cancelarAgendamento(id: string): Observable<void> {
        return this.http
            .patch<void>(`${this.baseUrl}/${id}/cancelar`, null,{
                responseType: 'text' as 'json',
            })
            .pipe(tap(() => this.notificarAtualizacoes()));
    }

    private notificarAtualizacoes() {
        this.getAllAgendamentos().subscribe({
            next: (agendamentos) => {
                this.agendamentosSubject.next(agendamentos);
            },
            error: (error) => {
                console.error(
                    'Erro ao atualizar a lista de agendamentos',
                    error
                );
            },
        });
    }

    convertData(data: string): string {
        return moment(data).format('DD/MM/YYYY HH:mm');
    }
}
