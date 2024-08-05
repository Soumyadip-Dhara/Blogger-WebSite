import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { NgModule } from '@angular/core';
import { routes } from '../app.routes';


export const BodyRoute : Routes = [
    // {
    //     path: '',
    //     loadComponent: () => import('./dashboard/dashboard.component').then(c => c.DashboardComponent)
    // },
    {
        path: 'user',
        loadComponent: () => import('./user/user.component').then(c => (c).UserComponent)
    },
    {
        path: 'post',
        loadComponent: () => import('./post/post.component').then((c) => c.PostComponent)
    }
]

    



