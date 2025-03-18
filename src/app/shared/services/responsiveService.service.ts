import { Injectable, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResponsiveServiceService {
  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay(1)
    );

  // Você pode adicionar mais breakpoints conforme necessário
  isTablet$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Tablet)
    .pipe(
      map(result => result.matches),
      shareReplay(1)
    );

  // Método para observar breakpoints personalizados
  observeBreakpoint(breakpoint: string | string[]): Observable<boolean> {
    return this.breakpointObserver.observe(breakpoint)
      .pipe(
        map(result => result.matches),
        shareReplay(1)
      );
  }


}
