import { StandingsPage } from './../pages/standings/standings';
import { GamePage } from './../pages/game/game';
import { TournamentsPage } from './../pages/tournaments/tournaments';
import { TeamDetailPage } from './../pages/team-detail/team-detail';
import { TeamsPage } from './../pages/teams/teams';
import { MyTeamsPage } from './../pages/my-teams/my-teams';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TeamHomePage } from '../pages/team-home/team-home';
import { EliteApi } from '../providers/elite-api/elite-api';
import { UserSettings } from '../providers/user-settings/user-settings';

@NgModule({
  declarations: [
    MyApp,
    MyTeamsPage,
    GamePage,
    TeamsPage,
    TeamDetailPage,
    TournamentsPage,
    StandingsPage,
    TeamHomePage
  ],
  imports: [
    BrowserModule,
    IonicStorageModule.forRoot(),
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MyTeamsPage,
    GamePage,
    TeamsPage,
    TeamDetailPage,
    TournamentsPage,
    StandingsPage,
    TeamHomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    EliteApi,
    UserSettings
  ]
})
export class AppModule { }
