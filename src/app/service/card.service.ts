import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Card } from '../model/card.model';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  private baseUrl = 'https://api.scryfall.com/cards';

  constructor(private http: HttpClient) { }

  getCard(cardName: string): Observable<Card> {
    const url = `${this.baseUrl}/named?exact=${encodeURIComponent(cardName)}`;
    return this.http.get<Card>(url).pipe(
      map((data: any) => this.transformCardData(data))
    );
  }

  getRandomCard(): Observable<Card> {
    const url = `${this.baseUrl}/random`;
    return this.http.get<Card>(url).pipe(
      map((data: any) => this.transformCardData(data))
    );
  }

  private transformCardData(data: any): Card {
    return {
      ...data
    } as Card;
  }
}
