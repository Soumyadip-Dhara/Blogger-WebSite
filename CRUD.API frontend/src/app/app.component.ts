import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuItem } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink,RouterLinkActive, MenubarModule, CommonModule,InputTextModule, ButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'CRUD.API';
  items :  MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        icon: "pi pi-home",
        label: '<b>Home</b>',
        escape: false,
        routerLink: ['/']
      },
      {
        icon: "pi pi-user",
        label: '<b>User View</b>',
        escape: false,
        routerLink: ['/user']
      },
      {
        icon: "pi pi-book",
        label: '<b>Post View</b>',
        escape: false,
        routerLink: ['/post']
      }
    ]
  }
}

// import { Component } from '@angular/core';
// import { RouterModule } from '@angular/router';

// @Component({
//   selector: 'app-root',
//   template: `
//     <router-outlet></router-outlet>
//   `,
//   styles: [``],
//   standalone: true,
//   imports: [RouterModule]
// })
// export class AppComponent {}
