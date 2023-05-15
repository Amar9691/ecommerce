import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class FaqComponent {
  faqs = [
    {
      id: 1,
      question: 'What payment methods do you accept?',
      answer: 'We are accepting all types of debit card to collect payment.',
    },
    {
      id: 2,
      question: 'What is your shipping policy?',
      answer:
        'Currently We are not applying any hidden charges on shipping for your product.',
    },
    {
      id: 3,
      question: 'Can I track my order once it has been shipped?',
      answer: 'Yes, You can track your order.',
    },
    {
      id: 4,
      question: 'Do you offer returns or exchanges?',
      answer: 'Yes, You can request to return purchase order within 2 days.',
    },
    {
      id: 5,
      question: 'How do I create an account on your website?',
      answer:
        'You need to click on register button on top menu and then need to enter required details to register with us.',
    },
    {
      id: 6,
      question:
        'How can I contact customer support if I have a question or issue?',
      answer:
        'You can contact us by sending your query on our mail address amarkumar9685079691@gmail.com',
    },
    {
      id: 7,
      question:
        'Is my personal and payment information secure on your website?',
      answer:
        'Yes, Your card details are fully secure and stored in encrypted form.',
    },
    {
      id: 8,
      question: 'What is your privacy policy?',
      answer: 'We are working on updating our privacy policy page very soon.',
    },
    {
      id: 9,
      question: 'Do you offer any discounts or promotions?',
      answer:
        'Currently We are not doing it but in future you will see such offers',
    },
    {
      id: 10,
      question: 'How do I unsubscribe from your email newsletter?',
      answer: 'You can mail us for that.',
    },
  ];
}
