import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {ServersProvider} from "../../providers/servers/servers";
import {Server} from "../../models/server";

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  public server: {
    name: string,
    url: string
  } = {
    'name': '',
    'url': ''
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public serversProvider: ServersProvider) {
  }

  public saveServer()
  {
    this.serversProvider.addServer(new Server(this.server.name, this.server.url, 'n/a'));
  }

}
