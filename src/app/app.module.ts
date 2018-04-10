import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BackgroundMode } from "@ionic-native/background-mode";
import { ServersProvider } from '../providers/servers/servers';
import { StatusCheckerProvider } from '../providers/status-checker/status-checker';
import { IonicStorageModule } from "@ionic/storage";
import { HttpModule } from "@angular/http";
import { LocalNotifications } from '@ionic-native/local-notifications';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BackgroundMode,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ServersProvider,
    StatusCheckerProvider,
    LocalNotifications
  ]
})
export class AppModule {}
