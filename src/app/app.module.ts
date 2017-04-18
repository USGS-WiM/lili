import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { StudiesPage } from '../pages/studies/studies'
import { SamplesPage } from '../pages/samples/samples'
import { AnalysisBatchesPage } from '../pages/analysisbatches/analysisbatches';
import { ResultsPage } from '../pages/results/results'
import { ReportsPage } from '../pages/reports/reports'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    StudiesPage,
    SamplesPage,
    AnalysisBatchesPage,
    ResultsPage,
    ReportsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    StudiesPage, 
    SamplesPage,
    AnalysisBatchesPage,
    ResultsPage,
    ReportsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
