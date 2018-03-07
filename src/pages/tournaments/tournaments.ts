import { TeamsPage } from './../teams/teams';
import { MyTeamsPage } from './../my-teams/my-teams';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-tournaments',
  templateUrl: 'tournaments.html',
})
export class TournamentsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TournamentsPage');
  }

  itemTapped() {
    this.navCtrl.push(TeamsPage);
  }
}
