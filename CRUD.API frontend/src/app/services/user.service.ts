import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { AddUsers, AllUsers, User, Users,  } from "../models/user.model";
import { FormGroup } from "@angular/forms";





@Injectable({
    providedIn: 'root'
  })
  export class UserService 
  {
    [x: string]: any;
    public url = environment.BaseURL+"User/";
    constructor(private http: HttpClient) { }

    public GetAllUsers(): Observable<any>{
        return this.http.get<any>(this.url+"FetchAllUsers/");
    }
    public GetActiveUsers(x: boolean): Observable<AllUsers>{
        return this.http.get<AllUsers>(this.url+"GetAllActiveUsers/"+ x);
    }
    public GetUserById(id: number): Observable<Users>{
        return this.http.get<Users>(this.url+"GetUserById/"+ id);
    }
  

    AddUser(formdata: FormGroup): Observable<Users>{
        return this.http.post<Users>(this.url+"AddUser/", formdata);
    }

    UpdateUser(formdata:FormGroup): Observable<any>{
        return this.http.put<any>(this.url+"UpdateUser/", formdata);
    }


    SoftDeleteUser(): Observable<any>{
        return this.http.delete<any>(this.url+"SoftDeleteUser/");
    }
    DeleteUsers(id:number): Observable<any>{
        return this.http.delete<any>(this.url+"DeleteUser/"+id);
    }
  }
