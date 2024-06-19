import { Component, OnInit } from '@angular/core';
import { Card } from '../model/card.model';
import { CardService } from '../service/card.service';

@Component({
  selector: 'app-random',
  templateUrl: './random.component.html',
  styleUrls: ['./random.component.css']
})
export class RandomComponent implements OnInit {
  card: Card | null = null;

  constructor(private cardService: CardService) {}

  ngOnInit(): void {
    this.loadRandomCard();
  }

  loadRandomCard(): void {
    this.cardService.getRandomCard().subscribe((card: Card) => {
      this.card = card;
    });
  }

  refreshRandomCard(): void {
    this.loadRandomCard();
  }

  capitalizeFirstLetter(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}
