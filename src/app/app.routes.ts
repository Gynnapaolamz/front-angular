import { provideRouter, RouterModule, Routes } from '@angular/router';
import { ContentTypeComponent } from './components/content-type/content-type.component';
import { KeywordsGroupComponent } from './components/keywords-group/keyword-group.component';
import { importProvidersFrom } from '@angular/core';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

export const routes: Routes = [
  { path: 'contentType', component: ContentTypeComponent},
  { path: 'keywordsGroup', component: KeywordsGroupComponent},
  { path: 'userProfile', component: UserProfileComponent},
  { path: '', redirectTo: '/contentType', pathMatch: 'full' }
];

export const appRouting = [
  provideRouter(routes),
  importProvidersFrom(RouterModule.forRoot(routes))
];
