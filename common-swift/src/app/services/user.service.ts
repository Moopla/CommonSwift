import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  USER_API_URL = environment.apiBaseUrl + "users/";

  constructor(private httpClient: HttpClient) {     
  }

  createUser(user: User){
    return this.httpClient.post(this.USER_API_URL + "create", user);
  }

  getAllUsers(){
    return this.httpClient.get<Array<User>>(this.USER_API_URL);
  }

  async getUser(){
    const token = AuthService.getJwtToken();
    if(!token){
        return null;
    }
    try{
        const user = await this.httpClient.get<User>(this.USER_API_URL + 'me').toPromise();
        return {user, verified: true};
    }catch(ex){
        return {verified: false};
    }
  }
}

export interface User{
  id:string;
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2: string;
  email: string;
  phoneNumber:string;
  city: string;
  country: string;
}
