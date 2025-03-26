import { Routes } from '@angular/router';
import { PetsComponent } from './feature/pets/view/pets.component';
import { AgendamentosComponent } from './feature/agendamentos/view/agendamentos.component';
import { NotificacoesComponent } from './feature/notificacoes/view/notificacoes.component';
import { CadastroPetComponent } from './feature/cadastro-pets/view/cadastro-pet/cadastro-pet.component';
import { PetDetailsComponent } from './feature/pets/components/petDetails/petDetails.component';
import { PetListComponent } from './feature/pets/components/petList/petList.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'pets',
    pathMatch: 'full',
  },
  {
    path: 'pets',
    component: PetsComponent,
    title: 'Pets cadastrados',
    children: [
        {
            path: '',
            component: PetListComponent
        },
        {
            path: 'cadastro',
            component: CadastroPetComponent,
            title: 'Cadastro de pets',
        },
        {
            path: ':petId',
            component: PetDetailsComponent
        },
    ]
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
