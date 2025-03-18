import { AsyncPipe } from '@angular/common';

import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ResponsiveServiceService } from '../../shared/services/responsiveService.service';
import { Title } from '@angular/platform-browser';
import { MatDrawer } from '@angular/material/sidenav';


@Component({
  selector: 'app-section-header',
  imports: [MatIconModule, MatToolbarModule, AsyncPipe],
  templateUrl: './section-header.component.html',
  styleUrl: './section-header.component.scss'
})
export class SectionHeaderComponent {
  pageTitle: string;
  private responsiveService = inject(ResponsiveServiceService);
  isHandset$ = this.responsiveService.isHandset$;
  drawer!: MatDrawer;

  constructor(private titleService: Title) {
    this.pageTitle = this.titleService.getTitle();
  }
}
