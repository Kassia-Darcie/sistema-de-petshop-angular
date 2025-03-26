export interface Agendamento {
    id: number,
    data: string,
    status: "PENDENTE" | "CONFIRMADO" | "CANCELADO" | "CONCLUIDO",
    tipo: "AUTOMATICO" | "MANUAL",
    pet: {
        petName: string,
        especie: "GATO" | "CACHORRO",
        tutorName: string,
        tutorEmail: string,
        raca: string,
        idade: string
    },
    cuidados: string[]
}