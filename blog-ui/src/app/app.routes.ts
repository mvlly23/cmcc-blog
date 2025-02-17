import { Routes } from '@angular/router';
import { LandingPage } from './landing/landing.component';
import { Blog } from './shared/blog/blog.component';
import { SearchPage } from './search/search.component';

export const routes: Routes = [
    { path: '', component: LandingPage },
    { path: 'blog/:id', component: Blog },
    { path: 'search/:id', component: SearchPage },
];
