import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { AppComponent } from './app.component';

const Paths: Routes = [
    { path: '', redirectTo: 'hero', pathMatch: 'full' },
    {
        path: 'hero',
        loadChildren: './hero/hero.module#HeroModule'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(Paths)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
