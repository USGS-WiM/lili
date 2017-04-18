import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { StudiesPage } from '../pages/studies/studies';
import { SamplesPage } from '../pages/samples/samples';
import { AnalysisBatchesPage } from '../pages/analysisbatches/analysisbatches';
import { ResultsPage } from '../pages/results/results';
import { ReportsPage } from '../pages/reports/reports';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List (example page)', component: ListPage },
      { title: 'Studies', component: StudiesPage },
      { title: 'Samples', component: SamplesPage },
      { title: 'Analysis Batches', component: AnalysisBatchesPage },
      { title: 'Results', component: ResultsPage },
      { title: 'Reports', component: ReportsPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
