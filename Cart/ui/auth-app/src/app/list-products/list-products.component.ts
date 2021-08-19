import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from '../shared/dialog.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {

  constructor(private productsService:ProductsService, private router:Router ,private authService:AuthService ,private activatedRoute:ActivatedRoute, private toastr:ToastrService ,private dialogService:DialogService) { }
   products:any=[]
   role:any=""
   isAdmin:boolean=false;
   myImg:string="assets/images/60bdfa30e7ddfb143cb95ebf.jpg";
   dummy:any=[]

  ngOnInit(): void {
    this.productsService.getProducts().subscribe(
     
      res=>this.products=res,
  
      err=>{
        if(err instanceof HttpErrorResponse){
          if(err.status===401){
                this.router.navigate(['/login'])
          }
        }
      }
    )
    console.log(this.products)
    this.role=this.authService.getRole()
    if(this.role=='admin'){
      this.isAdmin=true;
    }else{
      this.isAdmin=false;
    }

  } 

  deleteResto(item:number){
    this.dialogService.openConfirmDialog('Are you sure you want to delete this record')
    .afterClosed().subscribe(res=>{
     if(res){
      this.products.splice(item-1,1)
      this.productsService.deleteProduct(item).subscribe((data)=>{
      console.log(data)
      this.toastr.success('Your data removed successfully')

    })

    this.productsService.getProducts().subscribe(
     
      res=>this.products=res,
  
      err=>{
        if(err instanceof HttpErrorResponse){
          if(err.status===401){
                this.router.navigate(['/login'])
          }
        }
      }
    )
     }
    })

 
  }

openUp(id:number){
  this.productsService.getCurrentProducts(id).subscribe((data:any)=>{
  this.dummy=data;
  })
}

success(){
  alert("Product Sucessfully Added to wishlist")
}

showToastr(){
  this.toastr.success('Your Order Placed Successfully')
}


}
