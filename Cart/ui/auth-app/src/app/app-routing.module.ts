import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductsComponent } from './add-products/add-products.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AuthGuard } from './auth.guard';
import { HeaderComponent } from './common/header/header.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterComponent } from './register/register.component';
import { RoleGuard } from './shared/role.guard';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';

const routes: Routes = [
  
  
  {
    path:'user-dashboard',
    component:UserDashboardComponent,
    canActivate:[AuthGuard]
  },
  { 
    path:'login',
    component:LoginComponent
  },
  {
    path:'register',
    component:RegisterComponent
  },
  {
    path:'admin-dashboard',
    component:AdminDashboardComponent,
    canActivate:[RoleGuard]
  },
  {
    path:'add-products',
    component:AddProductsComponent,
    canActivate:[RoleGuard]
  },
  {
    path:'edit-products/:id',
    component:EditProductComponent,
    canActivate:[RoleGuard]
  },
  
  {
    path:'logout',
    redirectTo:'/login',
    pathMatch:'full'
  },
 
  
  
  { path: 'profile', component:HeaderComponent , loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule) },


  {
    path:'',
    redirectTo:'/login',
    pathMatch:'full'
    },
    {
      path:'**',
      component:PageNotFoundComponent

    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
