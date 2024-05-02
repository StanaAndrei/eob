import { Routes } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HomeComponent } from './components/home/home.component';
import { SignUpOtherComponent } from './components/sign-up-other/sign-up-other.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'sign-in', component: SignInComponent },
    { path: 'sign-up', pathMatch: 'full', component: SignUpComponent },
    { path: 'sign-up-other', component: SignUpOtherComponent },
    { path: 'home', component: HomeComponent },
    { path: '**', redirectTo: '/home' },
];
