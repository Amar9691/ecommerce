import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { HomeService } from '../home.service';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  filter,
} from 'rxjs/operators';

import { Subject, fromEvent } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  @ViewChild('searchproduct', { static: true }) searchproduct!: ElementRef;
  isSearching: boolean = false;
  constructor(private homeService: HomeService) {}
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
  }

  searchGetCall(term: string) {
    this.homeService.searchProducts(term).subscribe((value) => {
      this.homeService.updateProduct(value.products);
    });
  }
}
