import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AppState } from 'src/app/store/app.state.model';
import { Store } from '@ngrx/store';
import * as authActions from "../../store/auth/auth.actions";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  logOut(){
    this.store.dispatch(authActions.logginOut());
  }

  constructor(private breakpointObserver: BreakpointObserver, private store: Store<AppState>) {}

}
