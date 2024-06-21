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

  getAllCards(page: number): Observable<Card[]> {
    const url = `${this.baseUrl}/search?as=grid&order=name&page=${page}&q=%28game%3Apaper%29&unique=cards`;
    return this.http.get<{ data: Card[] }>(url).pipe(
      map(response => response.data.map(card => this.transformCardData(card)))
    );
  }

  private transformCardData(data: any): Card {
    return {
      ...data
    } as Card;
  }
}
