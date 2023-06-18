import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private http : HttpClient) { }
  apiUrl = 'http://localhost:3000/users';

  getUsers(){
    return this.http.get(this.apiUrl)
  }

  deleteUser(id:any){
    return this.http.delete(this.apiUrl+'/'+id)
  }

  addUser(data:any){
    return this.http.post(this.apiUrl, data)
  }

  updateUser(id:any, data:any){
    return this.http.put(this.apiUrl+'/'+id, data)
  }
}
