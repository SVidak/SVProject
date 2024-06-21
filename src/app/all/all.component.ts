import { Component, OnInit } from '@angular/core';
import { Card } from '../model/card.model';
import { CardService } from '../service/card.service';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class AllComponent implements OnInit {
  cards: Card[] = [];
  displayedCards: Card[] = [];
  page: number = 1;
  internalPage: number = 0;
  pageRange: number[] = [1, 2, 3, 4, 5];

  constructor(private cardService: CardService) { }

  ngOnInit(): void {
    this.fetchCards();
  }

  fetchCards(): void {
    this.cardService.getAllCards(this.page).subscribe(data => {
      this.cards = data;
      this.displayedCards = data.slice(0, 90);
    });
  }

  handleNextPage(): void {
    if ((this.internalPage + 1) * 90 < this.cards.length) {
      this.internalPage++;
    } else {
      this.page++;
      this.internalPage = 0;
      this.fetchCards();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  handlePageClick(pageNumber: number): void {
    this.page = pageNumber;
    this.internalPage = 0;
    this.pageRange = [
      pageNumber,
      pageNumber + 1,
      pageNumber + 2,
      pageNumber + 3,
      pageNumber + 4
    ];
    this.fetchCards();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  setPage(newPage: number): void {
    this.page = newPage;
    this.internalPage = 0;
    this.fetchCards();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  ngOnChanges(): void {
    if (this.page > this.pageRange[this.pageRange.length - 1]) {
      this.pageRange = this.pageRange.map(num => num + 1);
    } else if (this.page < this.pageRange[0]) {
      this.pageRange = this.pageRange.map(num => num - 1);
    }
  }
}
