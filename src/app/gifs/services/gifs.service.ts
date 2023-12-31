import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SeacrhGifsResponse } from '../interface/gifs.interface';
@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private apiKey: string = 'rfPmgVcjR0BTzamBZruOvT9bzo0Uth3T';
  private _record: string[] = [];
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';
  public results: Gif[] = [];

  constructor(private http: HttpClient) {
    this._record = JSON.parse(localStorage.getItem('record')! || '[]');
    this.results = JSON.parse(localStorage.getItem('results')! || '[]');
  }
  get record() {
    return [...this._record];
  }

  searchGifs(query: string) {
    query = query.trim().toLowerCase();

    if (!this._record.includes(query)) {
      this._record.unshift(query);
      this._record = this._record.splice(0, 10);
      localStorage.setItem('record', JSON.stringify(this._record));
    }

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', 10)
      .set('q', query);
    this.http
      .get<SeacrhGifsResponse>(`${this.serviceUrl}/search`, {
        params,
      })
      .subscribe((resp) => {
        this.results = resp.data;
        localStorage.setItem('results', JSON.stringify(this.results));
      });

    console.log(this._record);
  }
}
