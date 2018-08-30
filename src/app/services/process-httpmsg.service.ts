import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProcessHTTPMsgService {

  constructor() { }

  public extractData(res: Response) {
  	let body = res.json();

  	return body || {};
  }

  public handleError(error: Response | any) {
  	let errMsg: string;

  	if (error instanceof ErrorEvent) {
  		errMsg = error.message;
  	} else {
  		errMsg = `${error.status} - ${error.statusText || ''} ${error.error}`;
  	}

  	return Observable.throw(errMsg);

  }
}
