import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private _registerUrl="http://localhost:3000/api/register"
  private _loginUrl="http://localhost:3000/api/login"
  private _getUserUrl="http://localhost:3000/api/get-users"
  private _editUserUrl="http://localhost:3000/api/edit-users"



  constructor(private http:HttpClient, private router:Router) { }

 registerUser(user:any){
   return this.http.post<any>(this._registerUrl,user)
 }

 loginUser(user:any){
   return this.http.post<any>(this._loginUrl,user)
 }

 loggedIn(){
   return !! localStorage.getItem('token');   // to return boolean value we use !! marks
 }

 getUser(id:number){
 
    return this.http.get<any>(`${this._getUserUrl}/${id}`)
 
 }

logoutUser(){
  localStorage.removeItem('token')
  localStorage.removeItem('Role')
  localStorage.removeItem('userName')
  localStorage.removeItem('userDetails')
  this.router.navigate(['/login'])
 

}

clear(){
  localStorage.removeItem('userName')
  localStorage.removeItem('userDetails')
}


 getToken(){
   return localStorage.getItem('token')
 }

  
 getRole(){
   return localStorage.getItem('Role')
 }

 getUserName(){
  return localStorage.getItem('userName')
 }
 getUserDetails():any{
  return localStorage.getItem('userDetails')
 }

 updateUser(id:number,data:any){
  return this.http.put(`${this._editUserUrl}/${id}`,data)
 }
}
