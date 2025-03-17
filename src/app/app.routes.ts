import { Routes } from '@angular/router';
import { PetsComponent } from './pets/pets.component';
import { AgendamentosComponent } from './agendamentos/agendamentos.component';
import { NotificacoesComponent } from './notificacoes/notificacoes.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'pets',
    pathMatch: 'full'
  },
  {
    path: 'pets',
    component: PetsComponent
  },
  {
    path: 'agendamentos',
    component: AgendamentosComponent
  },
  {
    path: 'notificacoes',
    component: NotificacoesComponent
  }
];
