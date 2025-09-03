import { Module } from '../core/module';
import { quotes } from '../data/quotes';

export class RandomQuoteModule extends Module {
  constructor() {
    super('random-quote', 'Случайная цитата');
  }

  trigger() {
    this.showQuote();
  }

  placeQuoteRandomly(element) {
    const side = Math.random() < 0.5 ? 'right' : 'left';
    Object.assign(element.style, {
      [side]: `${Math.ceil(Math.random() * 50)}px`,
      top: `${Math.ceil(Math.random() * (window.innerHeight - 100))}px`,
    });
  }

  showQuote() {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    const randomQuoteHTML = document.createElement('div');
    randomQuoteHTML.className = 'quote-container';
    randomQuoteHTML.innerHTML = `<p class="quote-text">${randomQuote.text}</p>

    <p class="quote-author">${randomQuote.author}</p>`;
    this.placeQuoteRandomly(randomQuoteHTML);

    document.body.append(randomQuoteHTML);
    setTimeout(() => {
      randomQuoteHTML.remove();
    }, 3000);
  }
}
