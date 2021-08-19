import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private authService:AuthService,private toastr:ToastrService,private router:Router) { }
   
  userDetails:any=[];
  id:any;
  ngOnInit(): void {
   this.userDetails=JSON.parse(this.authService.getUserDetails())
  }
  
  editProfile= new FormGroup({
    name:new FormControl(''),
    userName:new FormControl(''),
    phoneNo:new FormControl(''),
    email:new FormControl('')
  })
  
  


  updateProfile(){
   
    this.authService.updateUser(this.id,this.editProfile.value).subscribe((data)=>{
    })
    this.authService.getUser(this.id).subscribe((data)=>{
      localStorage.setItem('userDetails',JSON.stringify(data))
      localStorage.setItem('userName',data.name)
      this.toastr.success("user profile successfully updated")
      this.router.navigate(['/user-dashboard'])

         
    })

  
  

}


getDetails(){ 
  this.id=this.userDetails._id
  this.authService.getUser(this.id).subscribe((data:any)=>{
    this.editProfile= new FormGroup({
      name:new FormControl(data['name']),
      userName:new FormControl(data['userName']),
      phoneNo:new FormControl(data['phoneNo']),
      email:new FormControl(data['email']),
    })
  })
}


}