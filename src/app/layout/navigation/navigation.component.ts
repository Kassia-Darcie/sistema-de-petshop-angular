import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Title } from '@angular/platform-browser';

import { ResponsiveServiceService } from '../../shared/services/responsiveService.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
  ]
})
export class NavigationComponent {
  pageTitle: string;
  private responsiveService = inject(ResponsiveServiceService);
  constructor(private titleService: Title) {
    this.pageTitle = this.titleService.getTitle();
  }
  isHandset$ = this.responsiveService.isHandset$;


}
