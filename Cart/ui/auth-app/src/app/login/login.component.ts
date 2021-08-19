import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
   error:any=""
   errorBol:boolean=false;
  constructor(private auth:AuthService,private router:Router) { }

  login= new FormGroup({
    
    email:new FormControl('',[Validators.required,Validators.minLength(4)]),     
    password:new FormControl('',[Validators.required,Validators.minLength(6)])

  })

  get f() { return this.login.controls; }

  reset(){
   this.login.reset();
 }
 
  ngOnInit(): void {
  }

  loginUser(){
  this.auth.loginUser(this.login.value).subscribe(
    res=>{
      console.log("this is the response "+res)
      localStorage.setItem('token',res.token) 
      localStorage.setItem('Role',res.userDetails.Role)
      localStorage.setItem('userName',res.userDetails.name)
      localStorage.setItem('userDetails',JSON.stringify(res.userDetails))
      

       if(res.userDetails.Role=='admin'){
        this.router.navigate(['/admin-dashboard'])
       }else{
        this.router.navigate(['/user-dashboard'])
       } 
      
    },
    err=>{
    console.log(err)
    this.errorBol=true;
    this.error=err.error;
    setTimeout(()=>{
     this.errorBol=false;
    },2000)
    }
  )
  }

}
