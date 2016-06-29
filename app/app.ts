import {Component, ViewChild, provide} from '@angular/core';
import {BrowserXhr, Http, HTTP_PROVIDERS, JSONP_PROVIDERS} from '@angular/http';
import {Platform, ionicBootstrap, Nav} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
//import {TabsPage} from './pages/tabs/tabs';

import {MoviesPage} from './pages/movies/movies';
import {MovieDetailPage} from './pages/movie-detail/movie-detail';
import {MoviesData} from './providers/movies-data';

@Component({
  templateUrl: 'build/app.html'
})
export class MyApp {
  @ViewChild(Nav) private nav: Nav;

  private rootPage:any;

  constructor(private platform:Platform) {
    this.rootPage = MoviesPage;

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  public goPage() {
    this.nav.setRoot(MoviesPage)
  }
}

ionicBootstrap(MyApp, [HTTP_PROVIDERS, JSONP_PROVIDERS, MoviesData])
