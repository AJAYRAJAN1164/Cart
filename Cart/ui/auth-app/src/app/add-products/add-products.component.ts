import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent implements OnInit {

  constructor(private productService:ProductsService) { }

  alert:boolean=false;


  addProducts= new FormGroup({
    name:new FormControl('',[Validators.required]),
    category:new FormControl('',[Validators.required]),
    price:new FormControl('',[Validators.required]),
    description:new FormControl('',[Validators.required]),
    
  })

  get f() { return this.addProducts.controls; }


  collectProducts(){
    this.productService.saveProduct(this.addProducts.value).subscribe((data)=>{
     console.log(data)
    })

    this.alert=true;
    this.addProducts.reset({})
  }

  closeAlert(){
    this.alert=false;
  }


  ngOnInit(): void {
  }

}
