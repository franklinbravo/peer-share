import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HorarioComponent } from './components/horario/horario.component';
import { FormComponent } from './components/form/form.component';
import { PlansComponent } from './components/plans/plans.component';
import { CardsComponent } from './components/cards/cards.component';
import { NotesComponent } from './components/notes/notes.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { ChatComponent } from './components/chat/chat.component';

const routes: Routes = [
    {path: '', redirectTo: '/horario', pathMatch: 'full' },
    {path:'horario', component: HorarioComponent },
    {path:'home', component: HomeComponent },
    {path:'form', component: FormComponent },
    {path:'plans', component: PlansComponent },
    {path:'cards', component: CardsComponent },
    {path:'notes', component: NotesComponent },
    {path:'contacts',component:ContactsComponent},
    {path:'chat', component: ChatComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
