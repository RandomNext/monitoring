import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { BackgroundMode } from "@ionic-native/background-mode";
import { StatusCheckerProvider } from "../providers/status-checker/status-checker";
import { ServersProvider } from "../providers/servers/servers";
import { Server } from "../models/server";
import { LocalNotifications } from '@ionic-native/local-notifications';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  statusTask: any;

  pages: Array<{title: string, component: any}>;

  // Lets add background mode here
  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private backgroundMode: BackgroundMode, private serversProvider: ServersProvider, private statusChecker: StatusCheckerProvider, private localNotification: LocalNotifications) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Servery', component: HomePage },
      { title: 'Přidat', component: ListPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.nav.setRoot(HomePage);
      this.serversProvider.addServer(new Server('test', 'http://192.168.0.143:8000/api/testpoint', 'a/n'));
        //Enable background mode here
      this.backgroundMode.enable();
      this.backgroundMode.setDefaults({ silent: true });

      console.log(this.serversProvider.getLocalServers());

      this.statusTask = setInterval(() => {
          this.serversProvider.getLocalServers().forEach((server, index) => {
              this.statusChecker.getServerStatus(server).then(data => {
                  if (data.status != 200 && this.backgroundMode.isActive()) {
                      this.localNotification.schedule({
                          id: 1,
                          title: server.name,
                          text: 'Neodpověděl dvoukilčo'
                      });
                      server.status = 'ko';
                  } else {
                      server.status = 'ok';
                  }
                  this.serversProvider.editServer(server, index);
              }).catch(error => {
                  console.log(error);
              })
          })
      }, 600000);

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
