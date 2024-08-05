import { Component, EventEmitter, NgModule, OnInit, Output } from '@angular/core';
import { Validators, FormBuilder,FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';

import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';
import { PasswordModule } from 'primeng/password';



import { CommonModule, DatePipe } from '@angular/common';
import { PostComponent } from '../post.component';
import { AllPost, Post } from '../../../models/post.model';
import { PostService } from '../../../services/post.service';
import { HttpClient } from '@angular/common/http';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';



@Component({
  selector: 'app-post-entry',
  standalone: true,
  imports: [ButtonModule, DialogModule, ReactiveFormsModule, DropdownModule, TriStateCheckboxModule, InputTextModule, PasswordModule, PostComponent, CommonModule ],
  templateUrl: './post-entry.component.html',
  styleUrl: './post-entry.component.scss',
  providers: [DatePipe]
})
export class PostEntryComponent implements OnInit 
{
  selectedRow: AllPost[] | null= null;
  
  category: any[]=[
    
    {name: 'Health', value: 1},
    {name: 'Technology', value: 2},
    {name: 'Travel', value: 3},
    {name: 'Sports', value: 4}
  ];

  isPublished: any[]=[
    
    {name: 'TRUE', value: true},
    {name: 'FALSE', value: false}
  ];


  
  
  
  postdata: FormGroup = new FormGroup({})
  id!: number;
  thePost? : Post;

  isAdding : boolean = false;

  currentDate : string;
  
  constructor(private fb:FormBuilder, public postService: PostService,private config: DynamicDialogConfig, public mainRef: DynamicDialogRef,private http: HttpClient, private datePipe: DatePipe){
    this.currentDate = new Date().toISOString().slice(0, -1);

  }
  

  

  ngOnInit(){
    // this.postdata = this.initializePostForm( 
    // );
    // this.id=this.config.data.id;
    // console.log(this.id);
    // this.postdata = this.initializePostForm(true);

    this.postdata= this.initializePostForm();
  this.id = this.config.data.id;
  console.log(this.id);
  this.isAdding=true;
  if (this.id != null) {
    this.postService .GetPostById(this.id).subscribe((response) => {
      if (response.statusCode == 200) {
        this.thePost = response.result[0];
        console.log(response);
        console.log(this.thePost);
        this.postdata = this.initializePostForm(true);
        this.isAdding=false;
      }
    });  
  }
  }

  initializePostForm(isDisabled: boolean =false){
    const new_form  = this.fb.group({
      id:[{ value: this.thePost?.id ?? null, disabled: false }, Validators.required],
      Title:[{ value: this.thePost?.title ?? "", disabled: false }, Validators.required],
      Description:[{ value: this.thePost?.description ?? "", disabled: false }, Validators.required],
      Category:[{ value: this.thePost?.category ?? null, disabled: false }, Validators.required],
      CreatedBy:[{ value: this.thePost?.createdBy ?? null, disabled: isDisabled }, Validators.required],
      CreatedDate:[this.currentDate, Validators.required],
      isPublished:[{ value: this.thePost?.isPublished ?? "", disabled: false }, Validators.required],

    })
    return new_form
  }
  onCancel() {
    this.postdata.reset();
    this.mainRef.close();
  }

  getAll(){
    
    
    this.postService.GetAllPosts().subscribe((data) => {
    
      console.log(data.result);
      
      this.selectedRow = data.result;
     
    });
  }

  getUserData(id:number){
    
    this.postService.GetPostById(this.id).subscribe((data) => {
    
      console.log(data.result);
      
      this.selectedRow = data.result;
     
    });
  }

  onSubmit() {      
      console.log(this.postdata.value);      
     
      this.postService.AddPost(this.postdata.value).subscribe((response)=>{
        console.log(response);
        
        
        
      }, (error)=>{console.error(error);
      }   
      )
      this.getAll();  
      this.mainRef.close({added:true});
  }

  // onEdit() {
  //   console.log(this.postdata.value.id);
  //   //this.user = this.userService.GetUserById(this.id);
  //   console.log(this.config.data);
    
    
    
  //   this.postService.UpdatePosts(this.postdata.value).subscribe((response) => {
  //     console.log(response);
  //   }, (error) => {
  //     console.error(error);
  //   });
  //   this.getAll();  
  //   this.mainRef.close();
  // }





  submitPostForm() {
    // Prepare the form data including values from disabled fields
    const formData = this.prepareFormData();
  
    // Call the service to submit the data
    this.postService.UpdatePosts(formData).subscribe(
      (response) => {
        // Handle the success response
        console.log('Data submitted successfully:', response);
        
      },
      (error) => {
        
        console.error('Error submitting data:', error);
        
        
      }
    );
    this.getAll();
    this.mainRef.close({updated: true});
  }
  
  prepareFormData() {
    // Get the form value with all fields including disabled ones
    const formData = { ...this.postdata.getRawValue() };
  
    
  
    return formData;
  }

}
