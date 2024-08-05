import { Component, EventEmitter, NgModule, OnInit, Output } from '@angular/core';
import { Validators, FormBuilder,FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { UserService } from '../../../services/user.service';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';
import { PasswordModule } from 'primeng/password';
import { UserComponent } from '../user.component';

import { AllUser, User, Users } from '../../../models/user.model';
import { CommonModule } from '@angular/common';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';



@Component({
  selector: 'app-user-entry',
  standalone: true,
  imports: [ButtonModule, DialogModule, ReactiveFormsModule, DropdownModule, InputTextModule, PasswordModule, UserComponent, CommonModule, ToastModule ],
  templateUrl: './user-entry.component.html',
  styleUrl: './user-entry.component.scss',
  providers: [MessageService]
  
})
export class UserEntryComponent implements OnInit 
{
  theUser?: User;
  selectedRow: AllUser[] | null= null;
  
  
  isActive: any[]=[
    {name: 'TRUE', value: true},
    {name: 'FALSE', value: false}
  ];


 
  
  
  userdata: FormGroup = new FormGroup({})
  id!: number; 
  isAdding : boolean = false;
  
  alluser!: User;

  
  constructor(private fb:FormBuilder, public mainRef: DynamicDialogRef, public userService: UserService, private config: DynamicDialogConfig, private messageService : MessageService){}

  ngOnInit() {
    this.userdata = this.initializeUserForm();
    this.id=this.config.data.id;
    console.log(this.id);
    this.isAdding = true;
    console.log(this.isAdding);
    if (this.id != null) {
      this.userService .GetUserById(this.id).subscribe((response) => {
        
          this.theUser = response.result[0];
          console.log(this.theUser);
          this.userdata = this.initializeUserForm(true);
          
          console.log(this.theUser);
          this.isAdding=false;
          console.log(this.isAdding);
          
          // this.actions = this.theRegistration.actions;
          // this.getIFSC(this.theRegistration.regDetails.ifsc);
          // this.isViewOnly = true;
          // if (response.result.actions.includes(ActivityEnum.UPDATE)) this.isViewOnly = false;
          // this.regForm = this.initializeRegForm(this.isViewOnly);
        
      });


    }
  }

  initializeUserForm(isDisabled: boolean = false){
    const new_form  = this.fb.group({
      id:[{ value: this.theUser?.id ?? null, disabled: false }, Validators.required],
      Name:[{ value: this.theUser?.name ?? "", disabled: isDisabled }, Validators.required],
      Password:[{ value: this.theUser?.password ?? "", disabled: isDisabled }, [
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')
      ]],
      IsActive:[{ value: this.theUser?.isActive ?? "", disabled: false }, Validators.required],
    })
    return new_form
  }

  

  onCancel() {
    this.userdata.reset();
    this.mainRef.close();
  }
  getAll(){
    
    
    this.userService.GetAllUsers().subscribe((data) => {
    
      console.log(data.result);
      
      this.selectedRow = data.result;
     
    });
  }

  getUserData(id:number){
    
    this.userService.GetUserById(id).subscribe((data) => {
    
      console.log(data.result);
      
      this.selectedRow = data.result;
     
    });
  }

  onSubmit() {    
    
      console.log(this.userdata);
      if(this.userdata.get("Password")?.valid && this.userdata.get("Name")?.valid){
        console.log(this.userdata.value);      
     
        this.userService.AddUser(this.userdata.value).subscribe(
          (response)=>{
          console.log(response);
          this.messageService.add({severity: 'success', summary: 'Success', detail: 'User Added successfully'});
          this.getAll();
          this.mainRef.close();
          
          
        })
        
      }else{
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Failed to add user'});
      }
    }
      
  //     console.log(this.userdata.value);      
     
  //     this.userService.AddUser(this.userdata.value).subscribe(
  //       (response)=>{
  //       console.log(response);
  //       this.messageService.add({severity: 'success', summary: 'Success', detail: 'User Added successfully'});
        
        
        
  //     }, (error)=>{console.error(error);
  //       console.error('Error deleting user:', error);
  //       this.messageService.add({severity: 'error', summary: 'Error', detail: 'Failed to add user'});
  //     }   
  //     )  
  //     this.getAll();
  //     this.mainRef.close({added:true});
   
   
  // }

  // onEdit() {
  //   this.isAdding = false;
  //   this.isUpdating = true;
  //   console.log(this.userdata.value.id);
  // //this.user = this.userService.GetUserById(this.id);
  //   console.log(this.config.data);
    
    
    
  //   this.userService.UpdateUser(this.userdata.value).subscribe((response) => {
  //     console.log(response);
  //   }, (error) => {
  //     console.error(error);
  //   });
  //   this.getAll();
  //   this.mainRef.close();

  // }



  
  
  
  
  
  
  submitUserForm() {
    // Prepare the form data including values from disabled fields
    const formData = this.prepareFormData();
  
    // Call the service to submit the data
    this.userService.UpdateUser(formData).subscribe(
      (response) => {
        // Handle the success response
        console.log('Data submitted successfully:', response);
        
      },
      (error) => {
        
        console.error('Error submitting data:', error);
        
        
      }
    );
    this.getAll();
    this.mainRef.close({updated:true});
  }
  
  prepareFormData() {
    // Get the form value with all fields including disabled ones
    const formData = { ...this.userdata.getRawValue() };
  
    
  
    return formData;
  }
  
 





}
