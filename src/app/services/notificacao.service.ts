import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Notificacao } from '@app/models/notificacao.model';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class NotificacaoService {
    private readonly baseUrl = 'http://localhost:8080/api/notificacoes';
    private notificacoesSubject = new BehaviorSubject<Notificacao[]>([]);
    notificacoes$ = this.notificacoesSubject.asObservable();

    constructor(private http: HttpClient) {}

    listar(filtros: any): Observable<Notificacao[]> {
        return this.http
            .get<Notificacao[]>(this.baseUrl, {params: filtros})
            .pipe(
                tap((notificacoes: any) => {
                    console.log('Notificações recebidas:', notificacoes);
                    this.notificacoesSubject.next(notificacoes);
                }),
                catchError((error) => {
                    console.error('Erro ao carregar notificações:', error);
                    return throwError(() => error);
                })
            );
    }

    marcarComoLida(id: number): Observable<void> {
        return this.http
            .put<void>(`${this.baseUrl}/${id}/marcar-lida`, {})
            .pipe(tap(() => this.notificarAtualizacoes()));
    }

    reenviar(id: number): Observable<void> {
        return this.http
            .post<void>(`${this.baseUrl}/${id}/reenviar`, {})
            .pipe(tap(() => this.notificarAtualizacoes()));
    }

    private notificarAtualizacoes() {
        this.listar(null).subscribe({
            next: (notificacoes) => {
                this.notificacoesSubject.next(notificacoes);
            },
            error: (error) => {
                console.error(
                    'Erro ao atualizar a lista de notificações',
                    error
                );
            },
        });
    }
}
