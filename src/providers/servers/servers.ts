import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";
import { Server } from "../../models/server";

@Injectable()
export class ServersProvider {
  private localServers: Server[] = [];

  constructor(private storage: Storage) {
    this.loadServers();
  }

  public getLocalServers(): Server[]
  {
    this.checkLocal();
    return this.localServers;
  }

  public setLocalServers(servers: Server[]): void
  {
    this.checkLocal();
    this.localServers = servers;
    this.saveServers();
  }

  public addServer(server: Server): void
  {
    this.checkLocal();
    console.log(this.localServers);
    this.localServers.push(server);
    this.saveServers();
  }

  public removeServer(server: Server): void
  {
    this.localServers = this.localServers.filter(item => item !== server);
    this.saveServers();
  }

  public editServer(server: Server, index): void
  {
    this.localServers[index] = server;
    this.saveServers();
  }

  private saveServers(): void
  {
    this.storage.set('servers', this.localServers);
  }

  private loadServers(): void
  {
    this.storage.get('servers').then(servers => {
      this.localServers = servers;
    });
  }

  private checkLocal(): void
  {
    if (this.localServers === null) {
      this.loadServers();
    }
  }

}
