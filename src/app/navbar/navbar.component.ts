import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { HomeService } from '../home.service';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  filter,
} from 'rxjs/operators';

import { Subject, fromEvent } from 'rxjs';
import { CardService } from '../card.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  @ViewChild('searchproduct', { static: true }) searchproduct!: ElementRef;
  isSearching: boolean = false;
  User!: any;

  constructor(
    private homeService: HomeService,
    private login: LoginService,
    public card: CardService,
    private router: Router
  ) {}
  ngOnInit(): void {
    fromEvent(this.searchproduct.nativeElement, 'keyup')
      .pipe(
        map((event: any) => {
          return event.target.value;
        }),
        filter((res) => res.length > 2),
        debounceTime(2000),
        distinctUntilChanged()
      )
      .subscribe((text: string) => {
        this.isSearching = true;
        this.searchGetCall(text);
      });
    this.login.LoggedUser.subscribe((user) => {
      this.User = user;
    });
  }

  searchGetCall(term: string) {
    this.homeService.searchProducts(term).subscribe((value) => {
      this.homeService.updateProduct(value.products);
    });
  }

  logOut() {
    this.login.islogin = false;
    this.login.changeLoggedUser({});
    this.router.navigate(['/log-in']);
  }
}
