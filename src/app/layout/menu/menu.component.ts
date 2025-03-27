import { Component } from '@angular/core';
import { MegaMenuItem } from 'primeng/api';
import { MegaMenuModule } from 'primeng/megamenu';

@Component({
  selector: 'app-menu',
  imports: [MegaMenuModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
    items: MegaMenuItem[] = [
        {
            label: 'Pets',
            routerLink: '/pets',
            routerLinkActiveOptions: { exact: true },
        },
        {
            label: 'Agendamentos',
            routerLink: '/agendamentos',
        },
        {
            label: 'Notificações',
            routerLink: '/notificacoes',
        },
    ];

}
