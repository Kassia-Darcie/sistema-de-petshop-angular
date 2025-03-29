import { Routes } from '@angular/router';
import { AgendamentosComponent } from './feature/agendamentos/view/agendamentos.component';
import { NotificacoesComponent } from './feature/notificacoes/notificacoes.component';
import { CadastroPetComponent } from './feature/cadastro-pets/cadastro-pet.component';
import { PetDetailsComponent } from './feature/pets/components/petDetails/petDetails.component';
import { PetListComponent } from '@feature/pets/petList.component';
import { ReagendamentoComponent } from './feature/agendamentos/reagendamento/reagendamento.component';
import { NovoAgendamentoComponent } from './feature/agendamentos/novo-agendamento/novo-agendamento.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'pets',
    pathMatch: 'full',
  },
  {
    path: 'pets',
    component: PetListComponent,
    title: 'Pets cadastrados',
  },
  {
    path: 'pets/cadastro',
    component: CadastroPetComponent,
    title: 'Cadastro de pets',
  },
  {
    path: 'pets/:petId',
    component: PetDetailsComponent
  },
  {
    path: 'agendamentos',
    component: AgendamentosComponent,
    title: 'Agendamentos'
  },
  {
    path: 'agendamentos/novo',
    component: NovoAgendamentoComponent,
    title: 'Novo agendamento'
  },
  {
    path: 'agendamentos/:id/reagendar',
    component: ReagendamentoComponent,
    title: 'Agendamentos | Reagendar'
  },
  {
    path: 'notificacoes',
    component: NotificacoesComponent,
    title: 'Notificações'
  }
];
