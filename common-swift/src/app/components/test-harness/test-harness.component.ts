import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { User, UserService } from '../../services/user.service';


@Component({
  selector: 'app-test-harness',
  templateUrl: './test-harness.component.html',
  styleUrls: ['./test-harness.component.scss']
})
export class TestHarnessComponent implements OnInit {

  userFormGroup: FormGroup;
  registeredUsers$: Observable<Array<User>>;
  selectedUser: any;
  title = 'common-swift';
  value = 'name'

  constructor(private userService: UserService, private fb:FormBuilder){
    this.registeredUsers$ = this.userService.getAllUsers();
  }

  ngOnInit(): void {
    this.userFormGroup = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      addressLine1: [''/*, Validators.required*/],
      addressLine2: [''/*, Validators.required*/],
      email: [''/*, Validators.required*/],
      phoneNumber: [''/*, Validators.required*/],
      password: [''/*, Validators.required*/],
      city: [''/*, Validators.required*/],
      country: [''/*, Validators.required*/]
    });
  }

  submitUser(){
    if(this.userFormGroup.valid){
      const user: User = this.userFormGroup.getRawValue();
      this.userService.createUser(user).subscribe(resp => {
        debugger;
        this.registeredUsers$ = this.userService.getAllUsers();
        this.userFormGroup.reset();
        this,this.userFormGroup.clearValidators();
      });
    }else{

    }
  }

}
