import "./styles.css";
import { ContextMenu } from "./menu";
import { TimerModule } from "./modules/timer.module";
import { BackgroundModule } from "./modules/background.module";
import { ShapeModule } from "./modules/shape.module";

// Инициализация меню
const menu = new ContextMenu("#menu");

// Добавление модулей
menu.add(new TimerModule());
menu.add(new BackgroundModule());
menu.add(new ShapeModule());

// Инициализация
menu.init();

// Добавим базовые стили для уведомлений
const style = document.createElement("style");
style.textContent = `
  .custom-timer {
    font-size: 1.2rem;
    font-weight: bold;
  }
  
  .timer-cancel {
    background: none;
    border: none;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .timer-cancel:hover {
    color: #ff4444;
  }
`;
document.head.appendChild(style);
