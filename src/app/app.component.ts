import { TournamentsPage } from './../pages/tournaments/tournaments';
import { MyTeamsPage } from './../pages/my-teams/my-teams';
import { TeamHomePage } from './../pages/team-home/team-home'
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, LoadingController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UserSettings } from '../providers/user-settings/user-settings';
import { EliteApi } from '../providers/elite-api/elite-api';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  favoriteTeams: any[];
  rootPage: any = MyTeamsPage;

  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private userSettings: UserSettings,
    private loadingController: LoadingController,
    private eliteApi: EliteApi,
    private events: Events) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.refreshFavorites();
      this.events.subscribe('favorites:changed', () => this.refreshFavorites());
      this.splashScreen.hide();

      this.userSettings.initStorage().then(() => this.rootPage = MyTeamsPage);
    });
  }

  refreshFavorites() {
    this.userSettings.getAllFavorites().then(favs => this.favoriteTeams = favs);
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  goHome() {
    this.nav.push(MyTeamsPage);
  }

  goToTeam(favorite) {
    let loader = this.loadingController.create({
      content: 'Getting data...',
      dismissOnPageChange: true
    });
    loader.present();
    this.eliteApi.getTournamentData(favorite.tournamentId).subscribe(l => this.nav.push(TeamHomePage, favorite.team));
  }

  goToTournaments() {
    this.nav.push(TournamentsPage);
  }
}
