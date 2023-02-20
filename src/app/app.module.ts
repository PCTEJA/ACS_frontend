import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { FarmerDashboardComponent } from './farmer-dashboard/farmer-dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DealerDashboardComponent } from './dealer-dashboard/dealer-dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { LoginService } from './services/login.service';
import { AuthGuard } from './auth.guard';
import { AuthInterceptor } from './auth.interceptor';
import { FarmerDetailsComponent } from './farmer-details/farmer-details.component';
import { MatIconModule } from '@angular/material/icon'
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { LoginFarmerComponent } from './login-farmer/login-farmer.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { SignupDealerComponent } from './signup-dealer/signup-dealer.component';
import { SignupFarmerComponent } from './signup-farmer/signup-farmer.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminDetailsComponent } from './admin-details/admin-details.component';
import { DealerDetailsComponent } from './dealer-details/dealer-details.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    FarmerDashboardComponent,
    DealerDashboardComponent,
    LoginComponent,
    FarmerDetailsComponent,
    LoginFarmerComponent,
    LoginAdminComponent,
    SignupDealerComponent,
    SignupFarmerComponent,
    AdminDashboardComponent,
    AdminDetailsComponent,
    DealerDetailsComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    Ng2SearchPipeModule
 
  ],
  providers: [DealerDashboardComponent,LoginService, AuthGuard, [{provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true}]],
  bootstrap: [AppComponent]
})
export class AppModule { }

//DealerDashboardComponent,LoginService, AuthGuard, [{provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true}]