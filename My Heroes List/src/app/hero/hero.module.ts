import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './hero.routing';

// REDUX
import { StoreModule, ActionReducerMap } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { appReducers, AppState } from './hero.store';
import { HeroesEffects } from './effects/heroes.effects';
import { HeroService } from './services/hero.service';
import { MessageService } from './services/message.service';

// COMPONENTES
import { HeroComponent } from './hero.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreateComponent } from './components/create/create.component';
import { UpdateComponent } from './components/update/update.component';
import { HeroDetailComponent } from './components/form/form.component';
import { HeroCardComponent } from './components/cards/cards.component';
import { ListComponent } from './components/list/list.component';

const reducers: ActionReducerMap<AppState> = appReducers;

@NgModule({
    declarations: [
        HeroComponent,
        DashboardComponent,
        CreateComponent,
        UpdateComponent,
        HeroDetailComponent,
        HeroCardComponent,
        ListComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        HttpModule,
        FormsModule,
        EffectsModule.forRoot([HeroesEffects]),
        AppRoutingModule,
        StoreModule.forRoot(appReducers),
        StoreDevtoolsModule.instrument({
            maxAge: 10
        })

    ],
    providers: [HeroService, MessageService]
})
export class HeroModule { }
