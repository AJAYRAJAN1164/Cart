import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  constructor(private productsService:ProductsService, private router:ActivatedRoute) { }
  
  alert:boolean=false;

  editProducts= new FormGroup({
    name:new FormControl(''),
    description:new FormControl(''),
    category:new FormControl(''),
    price:new FormControl('')
  })



  ngOnInit(): void {
  this.productsService.getCurrentProducts(this.router.snapshot.params.id).subscribe((data:any)=>{
    this.editProducts= new FormGroup({
      name:new FormControl(data['name'],[Validators.required]),
      description:new FormControl(data['description'],[Validators.required]),
      category:new FormControl(data['category'],[Validators.required]),
      price:new FormControl(data['price'],[Validators.required]),
    })
  })
  }
  get f() { return this.editProducts.controls; }

  update(){
    this.productsService.updateProducts(this.router.snapshot.params.id,this.editProducts.value).subscribe((data)=>{
      console.warn(data)
      this.alert=true;
    
    })
  }

  closeAlert(){
    this.alert=false;
  }
  reset(){
    this.editProducts.reset();
  }

}
