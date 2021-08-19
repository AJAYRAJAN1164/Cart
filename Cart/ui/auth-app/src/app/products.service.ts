import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private _productsUrl = 'http://localhost:3000/api/list-products';
  private addProductUrl="http://localhost:3000/api/add-products"
  private getCurrentProdUrl="http://localhost:3000/api/edit-products"

  private deleteProdUrl="http://localhost:3000/api/delete-products"

  constructor(private http: HttpClient) {}

  getProducts(){
     return this.http.get<any>(this._productsUrl)
  }

  saveProduct(data:any){
    return this.http.post(this.addProductUrl,data)
  }

  deleteProduct(id:number){
    return this.http.delete(`${this.deleteProdUrl}/${id}`)
  }
  
  getCurrentProducts(id:number){
    return this.http.get<any>(`${this.getCurrentProdUrl}/${id}`)
  }
  updateProducts(id:number,data:any){
    return this.http.put(`${this.getCurrentProdUrl}/${id}`,data)

   }
}
