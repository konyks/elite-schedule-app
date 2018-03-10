import { StatusBar } from '@ionic-native/status-bar';
import { TournamentsPage } from './../tournaments/tournaments';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular'
import { TeamHomePage } from '../team-home/team-home';
import { EliteApi } from '../../providers/elite-api/elite-api';

@Component({
  selector: 'page-my-teams',
  templateUrl: 'my-teams.html'
})
export class MyTeamsPage {
  favorites = [
    {
      team: { id: 6182, name: 'HC Elite 7th', coach: 'Michelotti' },
      tournamentId: '3dd50aaf-6b03-4497-b074-d81703f07ee8',
      tournamentName: 'March madness Tournament'
    },
    {
      team: { id: 6183, name: 'Hooping', coach: 'Johnson' },
      tournamentId: '3dd50aaf-6b03-4497-b074-d81703f07ee8',
      tournamentName: 'Hoops Challange'
    }
  ]
  constructor(private nav: NavController,
    private loadingController: LoadingController,
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
}
