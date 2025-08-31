import { Module } from '../core/module';
import { quotes } from '../data/quotes';

export class RandomQuoteModule extends Module {
  constructor() {
    super('random-quote', 'Случайная цитата');
  }

  trigger() {
    this.showQuote();
  }

  showQuote() {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    const randomQuoteHTML = document.createElement('div');
    randomQuoteHTML.className = 'quote-container';
    randomQuoteHTML.innerHTML = `<p class="quote-text">${randomQuote.text}</p>
    <p class="quote-author">${randomQuote.author}</p>`;

    // randomQuoteHTML.textContent = randomQuote.text + randomQuote.author;
    console.log(randomQuoteHTML);
    document.body.append(randomQuoteHTML);
    setTimeout(() => {
      randomQuoteHTML.remove();
    }, 3000);
  }
}
