import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
   role:any=""
   isAdmin:boolean=false;
   userName:any=""
  constructor(public authService:AuthService ) {
    
   }
   
  ngOnInit(): void {
    this.role=this.authService.getRole()
    if(this.role=='admin'){
      this.isAdmin=true;
    }else{
      this.isAdmin=false;
      this.userName=this.authService.getUserName()    
    }
    this.userName=this.authService.getUserName()
  }
 
  
}

