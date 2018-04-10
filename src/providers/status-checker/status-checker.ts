import { Injectable } from '@angular/core';
import { Server } from "../../models/server";
import { Http } from "@angular/http";

@Injectable()
export class StatusCheckerProvider {

  constructor(public http: Http) {
  }

  public getServerStatus(server: Server): Promise<any>
  {
    return new Promise((resolve, reject) => {
      this.http.get(server.url).subscribe(status => {
        resolve(status);
      }, (error) => {
        reject(error);
      });
    })
  }

}
