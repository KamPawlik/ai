import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeViewComponent } from './modules/core/home-view/home-view.component';
import { HeaderComponent } from './modules/core/header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from './modules/auth/auth.module';
import { RateModule } from './modules/rate/rate.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeViewComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AuthModule,
    RateModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
