export interface Notificacao {
    id: number;
    dataEnvio: Date;
    assunto: string;
    status: 'ENVIADO' | 'PENDENTE' | 'FALHA';
    lida: boolean;
    pet: string;
    tipo: string;
}
