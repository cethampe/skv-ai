import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
/*
import { Material } from '@angular/material';
import { DataTableModule, SharedModule, GMapModule, GrowlModule,
         DialogModule, CheckboxModule, DropdownModule, SpinnerModule,
         InputSwitchModule, CalendarModule } from 'primeng/primeng';
*/

// Egna komponenter
import { AppComponent } from './app.component';
import { ChattComponent } from './chatt/chatt.component';

// Services
import { AuthService } from './services/auth.service';
import { MimerService } from './services/mimer.service';

@NgModule({
  declarations: [
    AppComponent,
    ChattComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule
  ],
  providers: [AuthService, MimerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
