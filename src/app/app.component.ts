import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MenuLateralComponent } from './layout/menu-lateral/menu-lateral.component';
import { MenuComponent } from "./layout/menu/menu.component";
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MenuLateralComponent,
    MenuComponent,
    ToastModule
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'desafio-angular';


    ngOnInit() {

    }

}
