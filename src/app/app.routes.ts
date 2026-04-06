import { Routes } from '@angular/router';
import { UldeViewer } from './ulde/angular/ulde-viewer/ulde-viewer';

export const routes: Routes = [
  {
    path: '',
    component: UldeViewer
  },
  {
    path: '**',
    component: UldeViewer
  }
];
