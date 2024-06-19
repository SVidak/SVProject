import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CardService } from '../service/card.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

searchTerm: string = '';

  constructor(private router: Router, private cardService: CardService) {}

  searchCard(): void {
    if (this.searchTerm) {
      this.router.navigate(['/card', this.searchTerm]);
    }
  }

  randomCard(): void {
    this.cardService.getRandomCard().subscribe((card) => {
      this.router.navigate(['/random']);
    });
  }

  loginForm(): void{
    this.router.navigate(['/login']);
  }

  registerForm(): void{
    this.router.navigate(['/register']);
  }
}
