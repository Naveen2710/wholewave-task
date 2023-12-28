import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AppService {

  baseUrl = 'https://picsum.photos';

  constructor(
    private http: HttpClient
  ) { }

  getList = () => this.http.get(`${this.baseUrl}/v2/list`);

  imageInfo = (id: string) => this.http.get(`${this.baseUrl}/id/${id}/info`);

  imageSearch = (imageId: string) => this.http.get(`${this.baseUrl}/id/${imageId}`);

  getImageById = (url: string) => this.http.get(`${url}`, { responseType: 'blob' });

}
