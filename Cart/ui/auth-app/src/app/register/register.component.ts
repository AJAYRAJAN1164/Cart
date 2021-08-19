import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { tokenize } from '@angular/compiler/src/ml_parser/lexer';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private _auth:AuthService, private router:Router, private toastr:ToastrService) { }

  register= new FormGroup({
    name:new FormControl('',[Validators.required]),
    userName:new FormControl('',[Validators.required,Validators.minLength(4)]),
    email:new FormControl('',[Validators.required,Validators.email]),
    phoneNo:new FormControl('',[Validators.required,Validators.minLength(10),Validators.pattern("^[0-9]*$")]), 
    password:new FormControl('',[Validators.required,Validators.minLength(6)]),
    confirmPassword:new FormControl('',[Validators.required]),

  },{
    validators:<any> this.mustMatch('password','confirmPassword')
  })

   
  mustMatch(pass:string,confirmPass:string){
    return(formGroup:FormGroup)=>{
        const password=formGroup.controls[pass];
        const confirmPassword=formGroup.controls[confirmPass];
        if(confirmPassword.errors && !confirmPassword.errors.mustMatch){
          return
        }
        if(password.value !== confirmPassword.value){
                  confirmPassword.setErrors({mustMatch:true})
        }else{
          confirmPassword.setErrors(null);
        }
       
     }

  }

  get f() { return this.register.controls; }

  registerUser(){
   this._auth.registerUser(this.register.value).subscribe(
     res=>{
       console.log(res)
       localStorage.setItem('token',res.token)
       localStorage.setItem('Role',res.Role)
       this.toastr.success('SUCESSFULLY REGISTERED','Please login to continue')
       this.router.navigate(['/login'])
     },
     err=>console.log(err)
   )
    
  }
   


  reset(){
    this.register.reset();
    this.toastr.error('successfully Reset')
  }

  ngOnInit(): void {
  }



 
}
