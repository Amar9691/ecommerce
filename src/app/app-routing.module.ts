import { NgModule, Injectable } from '@angular/core';
import { RouterModule, Routes, TitleStrategy } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { RouterStateSnapshot } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FaqComponent } from './faq/faq.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { auth } from './auth';

const routes: Routes = [
  { path: '', redirectTo: 'Home', pathMatch: 'full' },
  { path: 'Home', component: HomeComponent, title: 'Home' },
  {
    path: 'product/:id',
    component: ProductDetailsComponent,
    title: 'Product Details',
  },
  {
    path: 'faqs',
    component: FaqComponent,
    title: 'faqs',
  },
  {
    path: 'about-us',
    component: AboutComponent,
    title: 'know about us',
  },
  {
    path: 'log-in',
    component: LoginComponent,
    title: 'login',
  },
  {
    path: 'register',
    component: RegisterComponent,
    title: 'signup for a profile',
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    title: 'checkout',
    canActivate: [auth],
  },
];

@Injectable({ providedIn: 'root' })
export class CustomTitleStragety extends TitleStrategy {
  constructor(private readonly title: Title) {
    super();
  }

  override updateTitle(routerState: RouterStateSnapshot) {
    const title = this.buildTitle(routerState);
    if (title !== undefined) {
      this.title.setTitle(`My Store | ${title}`);
    }
  }
}

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{ provide: TitleStrategy, useClass: CustomTitleStragety }],
})
export class AppRoutingModule {}
