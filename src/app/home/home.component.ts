import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';
import { Product } from '../product/product';
import { LoginService } from '../login.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  Products: Product[] = [];
  constructor(private HomeService: HomeService) {}
  ngOnInit() {
    this.HomeService.getProductsList().subscribe((value) => {
      this.Products = value.products;
    });
    this.HomeService.currentProduct.subscribe(
      (product) => (this.Products = product)
    );
  }

  trackById(index: number, item: Product) {
    return '${index}_${item.id}';
  }
}
