import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AddProductsComponent } from './add-products/add-products.component';
import { ListProductsComponent } from './list-products/list-products.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http'
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './token-interceptor.service';
import { RoleGuard } from './shared/role.guard';
import { HeaderComponent } from './common/header/header.component';
import {BrowserAnimationsModule} from  '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {MatDialogModule} from '@angular/material/dialog';
import { MatConfirmDialogComponent } from './mat-confirm-dialog/mat-confirm-dialog.component';





@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    AddProductsComponent,
    ListProductsComponent,
    UserDashboardComponent,
    AdminDashboardComponent,
    EditProductComponent,
    HeaderComponent,
    PageNotFoundComponent,
    MatConfirmDialogComponent,
  
   
  ],
  imports: [
    BrowserModule,
    MatDialogModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut:2000,
      progressBar:true
    }), 
   
    
    
   
  ],
  providers: [AuthService,AuthGuard,RoleGuard,
  {
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptorService,
    multi:true
   }],
  bootstrap: [AppComponent],
  entryComponents:[MatConfirmDialogComponent]
 
})
export class AppModule { }
