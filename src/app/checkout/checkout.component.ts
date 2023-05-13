import { Component, OnInit } from '@angular/core';
import { Product } from '../product/product';
import { CardService } from '../card.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  items: Product[] = [];
  Total: any = 0;
  constructor(private card: CardService, private form: FormBuilder) {}
  ngOnInit(): void {
    this.items = this.card.getItems();
    this.getTotalPrice();
  }

  checkoutForm = this.form.group({
    firstname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    zip: new FormControl('', [Validators.required]),

    cardname: new FormControl('', [Validators.required]),
    cardnumber: new FormControl('', [Validators.required]),
    expmonth: new FormControl('', [Validators.required]),
    expyear: new FormControl('', [Validators.required]),
    cvv: new FormControl('', [Validators.required]),
  });

  getTotalPrice() {
    var total = 0;
    this.items.map((item) => {
      total += item.discountPercentage;
    });
    this.Total = total;
  }

  placeOrder() {
    console.log(this.checkoutForm.valid);
  }
}
