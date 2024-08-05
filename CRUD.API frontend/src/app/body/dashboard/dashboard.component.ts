import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
//import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AllUser } from '../../models/user.model';
import { TabMenuModule } from 'primeng/tabmenu';

import { CommonModule } from '@angular/common';

@Component({
  
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,CardModule, ButtonModule,RouterLink,RouterModule,RouterModule,TabMenuModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
  
})

export class DashboardComponent
 //implements OnInit
  {
  // items: MenuItem[] | undefined;
  
  // ngOnInit() {
  //   this.items = [
  //       { label: 'Dashboard', icon: 'pi pi-home',routerLink:['/'] },
  //       { label: 'User', icon: 'pi pi-chart-line',routerLink:['/User'] },
  //       { label: 'Products', icon: 'pi pi-list' },
  //       { label: 'Messages', icon: 'pi pi-inbox' }
  //   ]
}



// import { Component } from '@angular/core';
// import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
// import { ButtonModule } from 'primeng/button';

// @Component({
//   selector: 'app-dashboard',
//   template: `
//     <div>
//       <h1>Dashboard</h1>
//       <button routerLink="/user">Go to User</button>
//     </div>
//   `,
//   styles: [``],
//   standalone: true,
//   imports: [RouterModule,ButtonModule, RouterLink, RouterLinkActive]
// })
// export class DashboardComponent {}
