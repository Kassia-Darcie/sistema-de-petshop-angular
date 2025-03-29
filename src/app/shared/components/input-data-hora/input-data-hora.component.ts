import { Component } from '@angular/core';

@Component({
    selector: 'app-input-data-hora',
    imports: [],
    templateUrl: './input-data-hora.component.html',
    styleUrl: './input-data-hora.component.css',
})
export class InputDataHoraComponent {
    minDate!: Date;
    horariosBloqueados: Date[] = [];

    constructor() {
        this.atualizarRestricoes();
    }

    // Atualiza as restrições diariamente
    private atualizarRestricoes(): void {
        const hoje = new Date();

        // 1. Define a data mínima como o dia atual
        this.minDate = new Date(hoje);
        this.minDate.setHours(0, 0, 0, 0); // Considera qualquer hora do dia atual

        // 2. Gera horários bloqueados
        this.horariosBloqueados = this.gerarHorariosInvalidos(hoje);
    }

    private gerarHorariosInvalidos(dataReferencia: Date): Date[] {
        const bloqueados: Date[] = [];

        // Bloqueia para todos os dias:
        // - Horas < 8h
        // - Horas >= 17h
        for (let hora = 0; hora < 24; hora++) {
            if (hora < 8 || hora >= 17) {
                const data = new Date(dataReferencia);
                data.setHours(hora, 0, 0, 0);
                bloqueados.push(data);
            }
        }

        return bloqueados;
    }

    validarIntervaloHorario(control: AbstractControl): ValidationErrors | null {
        const valor = control.value;

        if (valor) {
          const data = new Date(valor);
          const horas = data.getHours();

          // Verifica se está no intervalo 8h-16h59
          if (horas < 8 || horas >= 17) {
            return { horarioInvalido: true };
          }
        }
        return null;
      }
}
