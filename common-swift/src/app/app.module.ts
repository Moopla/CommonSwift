import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './components/nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from './services/user.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { LoginComponent } from './components/login/login.component';
import { WrapperComponent } from './components/wrapper/wrapper.component';
import { TestHarnessComponent } from './components/test-harness/test-harness.component';
import { UserResolver } from './resolvers/user.resolver';
import { AuthGuard, LoginGuard } from './guards/login.guard';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './store/auth/auth.reducers';
import { AuthEffects } from './store/auth/auth.effects';
import { EffectsModule } from '@ngrx/effects';
import { TokenInterceptorService } from './interceptors/token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    DashboardComponent,
    LoginComponent,
    WrapperComponent,
    TestHarnessComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatInputModule,
    MatFormFieldModule,
    HttpClientModule,
    MatSelectModule,
    StoreModule.forRoot({
      authState: authReducer
    }),
    EffectsModule.forRoot([
      AuthEffects
    ])
  ],
  providers: [
    TokenInterceptorService,
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}},
    {provide: HTTP_INTERCEPTORS, useClass:TokenInterceptorService , multi: true },
    UserResolver,
    LoginGuard,
    AuthGuard    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
