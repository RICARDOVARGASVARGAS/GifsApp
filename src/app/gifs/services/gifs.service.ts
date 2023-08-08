import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private apiKey: string = 'rfPmgVcjR0BTzamBZruOvT9bzo0Uth3T';
  private _record: string[] = [];

  public results: any = [];

  constructor(private http: HttpClient) {}

  get record() {
    return [...this._record];
  }

  searchGifs(query: string) {
    query = query.trim().toLowerCase();

    if (!this._record.includes(query)) {
      this._record.unshift(query);
      this._record = this._record.splice(0, 10);
    }

    this.http
      .get(
        `https://api.giphy.com/v1/gifs/trending?api_key=rfPmgVcjR0BTzamBZruOvT9bzo0Uth3T&q=${query}&limit=10`
      )
      .subscribe((resp: any) => {
        this.results = resp.data;
      });

    console.log(this._record);
  }
}
