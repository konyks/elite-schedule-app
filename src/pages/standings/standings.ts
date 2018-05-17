import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EliteApi } from '../../providers/elite-api/elite-api';
import * as _ from 'lodash';

@Component({
  selector: 'page-standings',
  templateUrl: 'standings.html',
})
export class StandingsPage {
  public allStandings: any[];
  public divisionFilter = 'all';
  public standings: any[];
  public team: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private eliteApi: EliteApi) { }

  ionViewDidLoad() {
    this.team = this.navParams.data;
    let torneyData = this.eliteApi.getCurrentTourney();
    this.standings = torneyData.standings;

    this.allStandings = torneyData.standings;

    this.filterDivision();
    console.log('standings:', this.standings);
    console.log('division Standings:', this.allStandings);
  }

  getHeader(record, recordIndex, records) {
    if (recordIndex === 0 || record.division !== records[recordIndex - 1].division) {
      return record.division;
    }
    return null;
  }

  filterDivision() {
    if (this.divisionFilter === 'all') {
      this.standings = this.allStandings;
    } else {
      this.standings = _.filter(this.allStandings, s => s.divison === this.team.division);
    }
  }

}
