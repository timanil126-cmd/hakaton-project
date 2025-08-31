import "./styles.css";
import { ContextMenu } from "./menu";
import { TimerModule } from "./modules/timer.module";
import { BackgroundModule } from "./modules/background.module";
import { ShapeModule } from "./modules/shape.module";
import { CocktailModule } from "./modules/cocktail.module";
import { RandomQuoteModule } from './modules/randomQuote.module';

// Инициализация меню
const menu = new ContextMenu('#menu');

// Добавление обычных модулей
menu.add(new TimerModule());
menu.add(new BackgroundModule());
menu.add(new ShapeModule());
menu.add(new CocktailModule());
menu.add(new RandomQuoteModule());

// Инициализация
menu.init();
