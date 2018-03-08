import { EliteApi } from './../../providers/elite-api/elite-api';
import { TeamHomePage } from './../team-home/team-home';
import { TeamDetailPage } from './../team-detail/team-detail';
import { Component } from '@angular/core';
import { NavController, NavParams, Loading, LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-teams',
  templateUrl: 'teams.html',
})
export class TeamsPage {
  public teams = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private eliteApi: EliteApi,
    public loadingController: LoadingController) {
  }

  ionViewDidLoad() {
    let selectedTourney = this.navParams.data;
    let loader = this.loadingController.create({
      content: 'Loading...'
    });

    loader.present().then(() => {
      this.eliteApi.getTournamentData(selectedTourney.id).subscribe(data => {
        this.teams = data.teams;
        loader.dismiss();
      });
    });

  }

  itemTapped(Event, team) {
    this.navCtrl.push(TeamHomePage, team);
  }
}
