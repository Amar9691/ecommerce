import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Product } from '../product/product';
import { CardService } from '../card.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { env } from 'src/environments/environment';
import { loadStripe, Stripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  items: Product[] = [];
  Total: any = 0;
  paymentHandler: any = null;
  @ViewChild('cardElement') cardElement!: ElementRef;
  stripe: any;
  card: any;

  constructor(private cards: CardService, private form: FormBuilder) {}
  ngOnInit(): void {
    this.items = this.cards.getItems();
    this.getTotalPrice();
    this.initializeStripe();
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

  async initializeStripe() {
    const stripePromise = loadStripe(env.STRIPE_PUBLIC_KEY);
    this.stripe = await stripePromise;
    const elements = this.stripe.elements();
    this.card = elements.create('card');
    this.card.mount(this.cardElement.nativeElement);
  }

  ValidateField(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  async processPayment() {
    const paymentMethod = await this.stripe.createPaymentMethod({
      type: 'card',
      card: this.card,
    });
    console.log(paymentMethod);
  }
}
