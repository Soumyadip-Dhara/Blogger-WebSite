
import { AllUser, AllUsers } from '../../models/user.model';

import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { UserService } from '../../services/user.service';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { PaginatorModule } from 'primeng/paginator';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UserEntryComponent } from './user-entry/user-entry.component';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';




@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterLink,CommonModule, RouterLinkActive, ConfirmPopupModule, InputTextModule,ConfirmDialogModule , ToolbarModule, TableModule, ButtonModule, CardModule, PaginatorModule, RadioButtonModule, ReactiveFormsModule, ToastModule ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
  providers: [DialogService, UserService,ConfirmationService, MessageService]
  
  
})
export class UserComponent implements OnInit 
{
  // formGroup!: FormGroup;
  isActive: any[]=[
    {name: 'All', value: 'All'},
    {name: 'TRUE', value: true},
    {name: 'FALSE', value: false}
  ];

    

  
  selectedUserId: number | undefined ;
  
  newval!: AllUser[];
  loading: boolean = true;
  statuses!: any[];
  
  user!: AllUser[];
  isAdding=false;
  dialogRef: DynamicDialogRef | undefined;
  
  constructor(public userService: UserService, public dialogService: DialogService, private confirmationService: ConfirmationService, public messageService: MessageService) {
    
  }
  
  ngOnInit() {
  this.fetchData();
  }
  fetchData(){
    this.userService.GetAllUsers().subscribe((data) => {
      console.log("onint");
      
      console.log(data.result);
      
      this.user = data.result.sort((a: {id:number;},b:{id:number;})=>a.id - b.id);
     
    });

    this.statuses = [
      { label: 'Inactive', value: false },
      { label: 'Active', value: true },
      { label: 'All', value: 'All' }
  ];
  }
  
  showDialog(ref_no?: number, headerText?: string) {
    // this.isAdding = true;
    console.log(ref_no);
    this.dialogRef = this.dialogService.open(UserEntryComponent, {
      header: headerText || 'Add User',
      data: { ref_no: ref_no },
      draggable: true,
      maximizable: false,
    });
    console.log("Hii");
    
    this.dialogRef.onClose.subscribe((data) => {

     
        this.showAddToast();
     
      
        this.ngOnInit();
    });
  }
  //bdjfsajn

  showUpdateDialog(id: number, headerText?: string) {
    
    this.selectedUserId = id;
    console.log(this.selectedUserId);
    
    this.dialogRef = this.dialogService.open(UserEntryComponent, {
      header: headerText || 'Update User',
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
  // DeleteUser(id: number) {
  //   this.userService.DeleteUsers(id).subscribe({
  //     next: (data) => {
  //       console.log('User deleted:', data);
        
  //         this.messageService.add({severity: 'success', summary: 'Success', detail: 'User deleted successfully'});
        
  //       this.ngOnInit();
  //     },
  //     error: (error) => {
  //       console.error('Error deleting user:', error);
        
        
  //     }
  //   });
  // }


  DeleteUser(id: number){
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass:"p-button-danger p-button-text cursor-pointer",
      rejectButtonStyleClass:"p-button-text p-button-text cursor-pointer",
      acceptIcon:"none",
      rejectIcon:"none",
  
      accept: () => {
        this.userService.DeleteUsers(id).subscribe((data)=>{
          console.log(data);
          this.user = Array(data.result);
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


  
  userActive(event: any){
    if (event.value == 'All'){
        this.userService.GetAllUsers().subscribe((data)=>{
          //console.log(data);
          this.user = data.result;
        });
      }
    else{
      this.userService.GetActiveUsers(event.value).subscribe((data)=>{
        console.log(data);
        this.user = data.result;
      });
      console.log(event);
    }
  

}



showAddToast(){
  this.messageService.add({ severity: 'success', summary: 'Added', detail: 'User Added successfully!', life: 2000 });
}
showUpdateToast(){
  this.messageService.add({ severity: 'success', summary: 'Updated', detail: 'User Updated successfully!', life: 2000 });
}

}
