import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { AddUsers, AllUser, AllUsers, Users } from "../models/user.model";
import { FormGroup } from "@angular/forms";
import { AllPost, AllPosts, Posts } from "../models/post.model";





@Injectable({
    providedIn: 'root'
  })
  export class PostService 
  {
    public url = environment.BaseURL+"Post/";
    constructor(private http: HttpClient) { }

    public GetAllPosts(): Observable<any>{
        return this.http.get<any>(this.url+"FetchAllPostsWithAuthorName/");

    }

    public GetAllPublishedPosts(x:boolean): Observable<any>{
        return this.http.get<any>(this.url+"FetchAllPublishedPosts/"+ x);

    }

    public GetPostById(id: number): Observable<Posts>{
        return this.http.get<Posts>(this.url+"GetPostById/"+ id);
    }
    public GetAllPostsByCategory(category: number): Observable<Posts>{
        return this.http.get<Posts>(this.url+"FetchAllPostsByCategory/"+ category);
    }

    public GetAllPostsByCategoryByIsPublished(category: number, ispublished : boolean): Observable<Posts>{
        return this.http.get<Posts>(this.url+"FetchAllPostsByCategory/"+ category + ispublished);
    }

    

    AddPost(formdata: FormGroup): Observable<any>{
        return this.http.post<any>(this.url+"AddPost/", formdata);
    }

    UpdatePosts(formdata:FormGroup): Observable<any>{
        return this.http.put<any>(this.url+"UpdatePost/", formdata);
    }

    SoftDeletePost(): Observable<any>{
        return this.http.delete<any>(this.url+"SoftDeletePost/");
    }

    DeletePosts(id:number): Observable<any>{
        return this.http.delete<any>(this.url+"DeletePost/"+id);
    }
  }
