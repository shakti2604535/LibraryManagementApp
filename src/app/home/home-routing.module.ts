import { NgModule } from '@angular/core';
import { ChildrenOutletContexts, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/auth.guard';
import { BookrentedComponent } from '../books/bookrented/bookrented.component';
import { SecondGuard } from '../second.guard';
import { CreateauthorbookComponent } from '../showauthorbook/createauthorbook/createauthorbook.component';
import { TryresolveGuard } from '../tryresolve.guard';
import { UnsavechangeGuard } from '../unsavechange.guard';
import { HomeComponent } from './home.component';


const routes: Routes = [
  {path:'',component:HomeComponent ,canActivateChild:[AuthGuard],children:[
    {path:'booktrack',component:BookrentedComponent},
    {path:'booktrack/:id', resolve:{data:SecondGuard},component:BookrentedComponent},
    {path:'create',canDeactivate:[UnsavechangeGuard],component:CreateauthorbookComponent},
    {path:'update/:bid/:aid',resolve:{data:TryresolveGuard},canDeactivate:[UnsavechangeGuard],component:CreateauthorbookComponent},
    { path: 'dashboard', loadChildren: () => import('src/app/dashboard/dashboard.module').then(m => m.DashboardModule) },
    { path: 'createbook', loadChildren: () => import('src/app/books/books.module').then(m => m.BooksModule)},
    // { path: 'createbook/:id', loadChildren: () => import('src/app/books/books.module').then(m => m.BooksModule)},
    { path: 'addperson', loadChildren: () => import('src/app/person/person.module').then(m => m.PersonModule)},
    { path: 'addauthor', loadChildren: () => import('src/app/author/author.module').then(m => m.AuthorModule)},
    {path:'showauthorbooks',loadChildren:() => import('src/app/showauthorbook/showauthorbook.module').then(m=>m.ShowauthorbookModule)}
]},
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }