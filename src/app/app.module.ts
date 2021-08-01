import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {GaugeModule} from 'angular-gauge';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import {SearchBarComponent} from './components/search-bar/search-bar.component';
import {HomeComponent} from './components/home/home.component';
import {AppRoutingModule} from './app-routing.module';
import { HttpErrorsInterceptor } from './interceptors/http-errors.interceptor';
import { HttpHeadersInterceptor } from './interceptors/http-headers.interceptor';
import { DetailsComponent } from './components/details/details.component';
import { GameTabsComponent } from './components/game-tabs/game-tabs.component';
import {A11yModule} from '@angular/cdk/a11y';

@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    HomeComponent,
    DetailsComponent,
    GameTabsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    GaugeModule.forRoot(),
    MatFormFieldModule,
    MatSelectModule,
    MatTabsModule,
    MatIconModule,
    AppRoutingModule,
    A11yModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpHeadersInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorsInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

