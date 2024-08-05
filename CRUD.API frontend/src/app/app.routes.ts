import { Routes } from '@angular/router';
import { DashboardComponent } from './body/dashboard/dashboard.component';
import { UserComponent } from './body/user/user.component';
import { PostComponent } from './body/post/post.component';



export const routes: Routes = [{
    path: '',
    component: DashboardComponent,
    // loadChildren: () => import('./body/body_routes').then((c) => c.BodyRoute),
  
},
{
    path: 'user',
    component: UserComponent,
    loadChildren: () => import('./body/body_routes').then(c => (c).BodyRoute),
},
{
path: 'post',
    component: PostComponent,
    loadChildren: () => import('./body/body_routes').then(c => (c).BodyRoute),
}



];




