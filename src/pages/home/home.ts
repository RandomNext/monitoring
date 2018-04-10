import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {ServersProvider} from "../../providers/servers/servers";
import {Server} from "../../models/server";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    public servers: Server[] = [];

    constructor(public navCtrl: NavController, public serversProvider: ServersProvider)
    {
        this.servers = serversProvider.getLocalServers();
    }

    public removeServer(server: Server)
    {
        this.serversProvider.removeServer(server);
        this.servers = this.serversProvider.getLocalServers();
    }

}
