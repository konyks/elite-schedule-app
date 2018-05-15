import { StatusBar } from '@ionic-native/status-bar';
import { TournamentsPage } from './../tournaments/tournaments';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular'
import { TeamHomePage } from '../team-home/team-home';
import { EliteApi } from '../../providers/elite-api/elite-api';
import { UserSettings } from '../../providers/user-settings/user-settings';

@Component({
  selector: 'page-my-teams',
  templateUrl: 'my-teams.html'
})
export class MyTeamsPage {
  favorites = [];

  constructor(private nav: NavController,
    private loadingController: LoadingController,
    private userSettings: UserSettings,
    private eliteApi: EliteApi) {

  }

  goToTournaments() {
    this.nav.push(TournamentsPage);
  }

  favoriteTapped($event, favorite) {
    let loader = this.loadingController.create({
      content: 'Loading...',
      dismissOnPageChange: true
    });
    loader.present();
    this.eliteApi.getTournamentData(favorite.tournamentId)
      .subscribe(t => this.nav.push(TeamHomePage, favorite.team));
  }

  ionViewDidEnter() {
    this.favorites = this.userSettings.getAllFavorites();
  }
}
