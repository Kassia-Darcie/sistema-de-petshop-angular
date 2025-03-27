import { Agendamento } from '@models/agendamento.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';

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
        this.agendamentosSubject.next([...this.agendamentosSubject.value, agendamento]);
    }

    getAllAgendamentos(): Observable<Agendamento[]> {
        return this.http.get<Agendamento[]>(this.baseUrl);
    }

    getAgendamentoById(id: string): Observable<Agendamento> {
        return this.http.get<Agendamento>(`${this.baseUrl}/${id}`);
    }

    saveAgendamento(agendamento: Partial<Agendamento>): Observable<string> {
        return this.http
            .post<string>(this.baseUrl + `/agendamento`, agendamento)
            .pipe(tap((res) => this.notificarAtualizacoes()));
    }

    updateAgendamento(agendamento: Agendamento) {
        return this.http.put(this.baseUrl + agendamento.id, agendamento);
    }

    reagendarAgendamento(id: number, data: string) {
        return this.http.patch(`${this.baseUrl}/${id}`, null, {
            params: {
                novoHorario: data
            }
        }).pipe(tap(() => this.notificarAtualizacoes()));
    }

    deleteAgendamento(id: string) {
        return this.http.delete(this.baseUrl + id);
    }

    private notificarAtualizacoes() {
        this.getAllAgendamentos().subscribe();
    }
}
