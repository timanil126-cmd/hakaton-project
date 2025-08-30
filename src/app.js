import "./styles.css";
import { ContextMenu } from "./menu";
import { TimerModule } from "./modules/timer.module";
import { BackgroundModule } from "./modules/background.module";
import { ShapeModule } from "./modules/shape.module";

// Инициализация меню
const menu = new ContextMenu("#menu");

// Добавление обычных модулей
menu.add(new TimerModule());
menu.add(new BackgroundModule());
menu.add(new ShapeModule());

// Инициализация
menu.init();
