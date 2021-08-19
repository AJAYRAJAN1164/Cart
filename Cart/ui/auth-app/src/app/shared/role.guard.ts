import { Injectable } from '@angular/core';
import { CanActivate, } from '@angular/router';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private router:Router){}

  canActivate() {
    let Role=localStorage.getItem('Role');
    if(Role=='admin'){
      return true;
     
    }
    alert('you dont have admin rights')
    this.router.navigate(['/user-dashboard'])
    return false;
    
  }
  
}
