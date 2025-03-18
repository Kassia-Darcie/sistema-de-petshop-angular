import { Routes } from '@angular/router';
import { PetsComponent } from './feature/pets/view/pets.component';
import { AgendamentosComponent } from './feature/agendamentos/view/agendamentos.component';
import { NotificacoesComponent } from './feature/notificacoes/view/notificacoes.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'pets',
    pathMatch: 'full',
  },
  {
    path: 'pets',
    component: PetsComponent,
    title: 'Pets cadastrados'
  },
  {
    path: 'agendamentos',
    component: AgendamentosComponent,
    title: 'Agendamentos'
  },
  {
    path: 'notificacoes',
    component: NotificacoesComponent,
    title: 'Notificações'
  }
];
