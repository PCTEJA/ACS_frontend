import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { DealerDashboardComponent } from './dealer-dashboard/dealer-dashboard.component';
import { DealerDetailsComponent } from './dealer-details/dealer-details.component';
import { FarmerDashboardComponent } from './farmer-dashboard/farmer-dashboard.component';
import { FarmerDetailsComponent } from './farmer-details/farmer-details.component';
import { FAuthGuard } from './fauth.guard';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginFarmerComponent } from './login-farmer/login-farmer.component';
import { LoginComponent } from './login/login.component';
import { SignupDealerComponent } from './signup-dealer/signup-dealer.component';
import { SignupFarmerComponent } from './signup-farmer/signup-farmer.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { MatCardModule } from '@angular/material/card';
import { PaymentComponent } from './payment/payment.component';


const routes: Routes = [
  {path:'', redirectTo:'landing-page', pathMatch:'full'},
  {path:'landing-page', component:LandingPageComponent},
  {path:'farmer-dashboard/:tk', component:FarmerDashboardComponent, canActivate: [FAuthGuard]},
  {path:'dealer-dashboard/:token', component:DealerDashboardComponent, canActivate: [AuthGuard]},
  {path:'admin-dashboard/:token', component:AdminDashboardComponent, canActivate: [AuthGuard]},
  {path:'login', component: LoginComponent},
  {path:'login-farmer', component:LoginFarmerComponent},
  {path:'login-admin', component:LoginAdminComponent},
  {path:'farmer-dashboard/:tk/:fid', component:FarmerDetailsComponent, canActivate:[FAuthGuard]},
  {path:'dealer-dashboard/:token/:dealerid', component:DealerDetailsComponent, canActivate:[AuthGuard]},
  {path:'signup-farmer', component:SignupFarmerComponent},
  {path:'signup-dealer', component:SignupDealerComponent},
  { path:'payment',component:PaymentComponent,pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), MatCardModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routerLinks = [LandingPageComponent,FarmerDashboardComponent, AdminDashboardComponent, 
  LoginAdminComponent,LoginComponent, DealerDashboardComponent, FarmerDetailsComponent, LoginFarmerComponent,
DealerDetailsComponent, SignupFarmerComponent, SignupDealerComponent]
