import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'person',
    loadChildren: () => import('./person/person.module').then( m => m.PersonPageModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then( m => m.UserPageModule)
  },
  {
    path: 'specialist',
    loadChildren: () => import('./specialist/specialist.module').then( m => m.SpecialistPageModule)
  },
  {
    path: 'agreement',
    loadChildren: () => import('./agreement/agreement.module').then( m => m.AgreementPageModule)
  },
  {
    path: 'agreement-type',
    loadChildren: () => import('./agreement-type/agreement-type.module').then( m => m.AgreementTypePageModule)
  },
  {
    path: 'procedures',
    loadChildren: () => import('./procedures/procedures.module').then( m => m.ProceduresPageModule)
  },
  {
    path: 'procedure-type',
    loadChildren: () => import('./procedure-type/procedure-type.module').then( m => m.ProcedureTypePageModule)
  },
  {
    path: 'agreement-list',
    loadChildren: () => import('./agreement-list/agreement-list.module').then( m => m.AgreementListPageModule)
  },
  {
    path: 'person-list',
    loadChildren: () => import('./person-list/person-list.module').then( m => m.PersonListPageModule)
  },
  {
    path: 'specialist-list',
    loadChildren: () => import('./specialist-list/specialist-list.module').then( m => m.SpecialistListPageModule)
  },
  {
    path: 'procedure-type-list',
    loadChildren: () => import('./procedure-type-list/procedure-type-list.module').then( m => m.ProcedureTypeListPageModule)
  },
  {
    path: 'procedure-list',
    loadChildren: () => import('./procedure-list/procedure-list.module').then( m => m.ProcedureListPageModule)
  },
  {
    path: 'schedule',
    loadChildren: () => import('./schedule/schedule.module').then( m => m.SchedulePageModule)
  },
  {
    path: 'attendance',
    loadChildren: () => import('./attendance/attendance.module').then( m => m.AttendancePageModule)
  },
  {
    path: 'patient-attendance',
    loadChildren: () => import('./patient-attendance/patient-attendance.module').then( m => m.PatientAttendancePageModule)
  },
  {
    path: 'attendance-list',
    loadChildren: () => import('./attendance-list/attendance-list.module').then( m => m.AttendanceListPageModule)
  },
  {
    path: 'schedule-list',
    loadChildren: () => import('./schedule-list/schedule-list.module').then( m => m.ScheduleListPageModule)
  },  {
    path: 'historic',
    loadChildren: () => import('./historic/historic.module').then( m => m.HistoricPageModule)
  },
  {
    path: 'appointment',
    loadChildren: () => import('./appointment/appointment.module').then( m => m.AppointmentPageModule)
  },
  {
    path: 'attendance-show',
    loadChildren: () => import('./attendance-show/attendance-show.module').then( m => m.AttendanceShowPageModule)
  },
  {
    path: 'person-edit',
    loadChildren: () => import('./person-edit/person-edit.module').then( m => m.PersonEditPageModule)
  },
  {
    path: 'schedule-edit',
    loadChildren: () => import('./schedule-edit/schedule-edit.module').then( m => m.ScheduleEditPageModule)
  },
  {
    path: 'appointment-edit',
    loadChildren: () => import('./appointment-edit/appointment-edit.module').then( m => m.AppointmentEditPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
