import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInput, MatInputModule } from '@angular/material/input';
import User from '../../types/user';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-form',
  imports: [MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent {

  formBuilder=inject(FormBuilder);
  userForm:FormGroup=this.formBuilder.group({
    name:['',[Validators.required]],
    email:['',[Validators.required, Validators.email]],
    age:[''],
    address:[''], 
    password:['',[Validators.required, Validators.minLength(6)]]
  });

  userService=inject(UserService);
  routerLink=inject(Router);
  route=inject(ActivatedRoute);
  editUserId!:string;
  ngOnInit(){
    const id=this.route.snapshot.params['id'];
    if(this.editUserId){
      this.userService.getUser(id).subscribe((result)=>{
        this.userForm.patchValue(result);
      });
    }
  }

  addUser(){
    if(this.userForm.invalid){
      alert('Please provide all the fields with valid data');
      return;
    }
    const model:User=this.userForm.value 
    this.userService.addUser(model).subscribe((result)=>{
      alert('User added successfully');
      this.routerLink.navigateByUrl('/');
    });   
  }
  updateUser(){
    if(this.userForm.invalid){
      alert('Please provide all the fields with valid data');
      return;
    }
    const model:User=this.userForm.value 
    this.userService.updateUser(this.editUserId,model).subscribe(result=>{
      alert('Update User Successfully');
      this.routerLink.navigateByUrl('/');
    })
  }
}
