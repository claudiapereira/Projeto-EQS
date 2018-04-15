import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Componentes
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreateComponent } from './components/create/create.component';
import { UpdateComponent } from './components/update/update.component';

const Paths: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'create', component: CreateComponent },
    { path: 'update/:id', component: UpdateComponent }
];

@NgModule({
    imports: [RouterModule.forChild(Paths)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
