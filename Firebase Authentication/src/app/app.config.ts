import { Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { DataService } from './data.service';

// Firebase
export const firebaseConfig = {
    apiKey: "AIzaSyCXfTBZ4dPRW3PCFvppPCua8fglLjMCJzg",
    authDomain: "claudia-rc-pereira.firebaseapp.com",
    databaseURL: "https://claudia-rc-pereira.firebaseio.com",
    projectId: "claudia-rc-pereira",
    storageBucket: "claudia-rc-pereira.appspot.com",
    messagingSenderId: "839999888794"
};

// Routes
export const appRoutes: Routes = [
  {
    path: 'app',
    component: AppComponent
  }, 
  {
    path: '',
    redirectTo: 'app',
    pathMatch: 'full'
  }
];