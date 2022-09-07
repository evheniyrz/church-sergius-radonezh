import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicResourceComponent } from './public-resource.component';

const routes: Routes = [{ path: ':sectionId', component: PublicResourceComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicResourceRoutingModule { }
