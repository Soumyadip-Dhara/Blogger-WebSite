// import { CommonModule } from '@angular/common';
// import { Component } from '@angular/core';
// import { RouterLink, RouterLinkActive } from '@angular/router';
// import { AllPost } from '../../models/post.model';
// import { TableModule } from 'primeng/table';

// @Component({
//   selector: 'app-post',
//   standalone: true,
//   imports: [RouterLink, RouterLinkActive, CommonModule, TableModule],
//   templateUrl: './post.component.html',
//   styleUrl: './post.component.scss'
// })
// export class PostComponent {
//   post!: AllPost[];
  
//   constructor(private postService: PostService) {}
  
//   ngOnInit(): void {
//   this.postService.GetAllUsers().subscribe((data) => {
//     console.log(data);
    
//   this.post = data.result;
  
//   });
//   }
// }




import { AllUser } from '../../models/user.model';

import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PostEntryComponent } from './post-entry/post-entry.component';

import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormGroup } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { AllPost, Blog } from '../../models/post.model';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';




@Component({
  selector: 'app-post',
  standalone: true,
  imports: [RouterLink,CommonModule, RouterLinkActive, DropdownModule, ConfirmDialogModule, ToolbarModule, TableModule, ToastModule, ButtonModule, InputTextModule, CardModule, RouterLinkActive ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
  providers: [DialogService, PostService, ConfirmationService, MessageService]
  
  
})
export class PostComponent implements OnInit 
{
  


  category: any[]=[
    {name: 'Category', value: 'All'},
    {name: 'Health', value: 1},
    {name: 'Technology', value: 2},
    {name: 'Travel', value: 3},
    {name: 'Sports', value: 4}
  ];

  isPublished: any[]=[
    {name: 'All', value: 'All'},
    {name: 'TRUE', value: true},
    {name: 'FALSE', value: false}
  ];

  
  post!: AllPost[];
  cols!: AllPost[];
  dialogRef: DynamicDialogRef | undefined;
  
  constructor(public postService: PostService, public dialogService: DialogService, private messageService : MessageService, private confirmationService : ConfirmationService) {}
  
  ngOnInit(): void {
  this.postService.GetAllPosts().subscribe((data) => {


    
    
  this.post = data.result.sort((a: {id:number;},b:{id:number;})=>a.id - b.id);

  
  });

  
  }
  
  showDialog(ref_no?: number, headerText?: string) {
    this.dialogRef = this.dialogService.open(PostEntryComponent, {
      header: headerText || 'Add Post',
      data: { ref_no: ref_no },
      draggable: true,
      maximizable: false,
    });
    this.dialogRef.onClose.subscribe((data) => {
      if(data.added){
        this.showAddToast();}
      this.ngOnInit();
    });
  }

  showUpdateDialog(id: number, headerText?: string) {
    console.log(id);
    this.dialogRef = this.dialogService.open(PostEntryComponent, {
      header: headerText || 'Update Post',
      data: { id: id},
      draggable: true,
      maximizable: false,
    });
    this.dialogRef.onClose.subscribe((data) => {
      if(data.updated){
        this.showUpdateToast();}
      this.ngOnInit();
    });
  }
  
  postPublished(event: any){
    if (event.value == 'All'){
        this.postService.GetAllPosts().subscribe((data)=>{
          //console.log(data);
          this.post = data.result;
        });
      }
    else{
      this.postService.GetAllPublishedPosts(event.value).subscribe((data)=>{
        console.log(data);
        this.post = data.result;
      });
      console.log(event);
    }
  

}
postCategory(event: any){
  if (event.value == 'All'){
      this.postService.GetAllPosts().subscribe((data)=>{
        //console.log(data);
        this.post = data.result;
      });
    }
  else{
    this.postService.GetAllPostsByCategory(event.value).subscribe((data)=>{
      console.log(data);
      this.post = data.result;
    });
    console.log(event);
  }


}

DeletePost(id: number){
  this.confirmationService.confirm({
    message: 'Do you want to delete this record?',
    header: 'Delete Confirmation',
    icon: 'pi pi-info-circle',
    acceptButtonStyleClass:"p-button-danger p-button-text cursor-pointer",
    rejectButtonStyleClass:"p-button-text p-button-text cursor-pointer",
    acceptIcon:"none",
    rejectIcon:"none",

    accept: () => {
      this.postService.DeletePosts(id).subscribe((data)=>{
        console.log(data);
        this.post = Array(data.result);
        this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'User deleted successfully!', life: 2000 });
        this.ngOnInit();
      });
    },
    reject: () => {
     // this.messageService.add({ severity: 'error', summary: 'Not Deleted', detail: 'User was not deleted!', life: 2000 });
      this.ngOnInit();
    }
    });
  }


  showAddToast(){
    this.messageService.add({ severity: 'success', summary: 'Added', detail: 'Post Added successfully!', life: 2000 });
  }
  showUpdateToast(){
    this.messageService.add({ severity: 'success', summary: 'Updated', detail: 'Post Updated successfully!', life: 2000 });
  }


}
