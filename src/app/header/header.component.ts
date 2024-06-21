import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CardService } from '../service/card.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  searchTerm: string = '';
  isLoggedIn: boolean = false;

  constructor(private router: Router, private cardService: CardService) {}

  ngOnInit(): void {
    this.checkLoginStatus();
  }

  checkLoginStatus(): void {
    const email = localStorage.getItem('email');
    const loggedIn = localStorage.getItem('loggedIn');

    this.isLoggedIn = !!(email && loggedIn === 'true');
  }

  searchCard(): void {
    if (this.searchTerm) {
      this.router.navigate(['/card', this.searchTerm]);
    }
  }

  randomCard(): void {
    this.cardService.getRandomCard().subscribe(() => {
      this.router.navigate(['/random']);
    });
  }

  allCards(): void {
    this.router.navigate(['/all']);
  }

  handleLoginLogout(): void {
    if (this.isLoggedIn) {
      this.onLogout();
    } else {
      this.router.navigate(['/login']);
    }
  }

  registerForm(): void {
    this.router.navigate(['/register']);
  }

  onLogout(): void {
    localStorage.removeItem('email');
    localStorage.removeItem('loggedIn');
    this.isLoggedIn = false;
    this.router.navigate(['/home']);
  }
}
