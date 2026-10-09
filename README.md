# 🚗 QAuto Playwright Automation Test Suite

Автоматизований тестовий проект для перевірки форми реєстрації на сайті [QAuto](https://qauto2.forstudy.space/).

Проект розроблено на **TypeScript** з використанням фреймворка **Playwright** та паттерна проектирування **Page Object Model (POM)**. Усі тести та класи Page Object містять детальні коментарі українською мовою.

---

## 📋 Опис тест-кейсів

Тестовий набір охоплює 9 тест-кейсів перевірки реєстрації з [Google Sheet](https://docs.google.com/spreadsheets/d/1aCjw6-r46FkdBBLzBxBcUtELjI9pXCIf25AIKL_Fgmw/edit?gid=0#gid=0):

1. **Успішна реєстрація з коректними даними** — заповнення полів валідними даними, натискання кнопки `Register`, перевірка успішного переходу на сторінку Гаража (`/panel/garage`).
2. **Перевірка помилки при порожньому полі Name** — зняття фокусу з порожнього поля `Name` -> перевірка помилки `"Name required"` та червоної рамки.
3. **Перевірка некоректних символів у полі Name** — введення `&` -> перевірка помилки `"Name is invalid"` та червоної рамки.
4. **Перевірка мінімальної довжини поля Name** — введення `A` (1 символ) -> перевірка помилки `"Name has to be from 2 to 20 characters long"` та червоної рамки.
5. **Перевірка максимальної довжини поля Name** — введення 21 символу -> перевірка помилки `"Name has to be from 2 to 20 characters long"` та червоної рамки.
6. **Перевірка помилки при порожньому полі Last Name** — зняття фокусу з порожнього поля `Last Name` -> перевірка помилки `"Last name required"` та червоної рамки.
7. **Перевірка мінімальної довжини поля Last Name** — введення `A` (1 символ) -> перевірка помилки `"Last name has to be from 2 to 20 characters long"` та червоної рамки.
8. **Перевірка максимальної довжини поля Last Name** — введення 21 символу (`123456789101112131415`) -> перевірка помилки `"Last name is invalid"` та червоної рамки.
9. **Перевірка некоректних символів у полі Last Name** — введення `&` -> перевірка помилки `"Last name is invalid"` та червоної рамки.

---

## 🛠️ Передумови (Prerequisites)

Перед запуском переконайтеся, що на вашому комп'ютері встановлено:
- **Node.js** (версія 18 або новіша)
- **npm** (йде в комплекті з Node.js)

---

## 🚀 Встановлення проекту

1. Склонуйте репозиторій або відкрийте папку проекту:
   ```bash
   cd c:\Work\My_repos\QAuto_playwrigt_sampe
   ```

2. Встановіть залежності npm:
   ```bash
   npm install
   ```

3. Встановіть необхідний браузер Chromium для Playwright:
   ```bash
   npx playwright install chromium
   ```

---

## 💻 Інструкція із запуску тестів

### 1. Стандартний запуск (всі тести у фоновому режимі Headless)
```bash
npm test
```
або
```bash
npx playwright test
```

### 2. Запуск тестів з відображенням браузера (Headed Mode)
Якщо ви бажаєте візуально спостерігати за виконанням дій у браузері:
```bash
npm run test:headed
```
або
```bash
npx playwright test --headed
```

### 3. Запуск у графічному інтерактивному режимі (Playwright UI Mode)
Зручний режим для відлагодження з покроковим переглядом:
```bash
npm run test:ui
```
або
```bash
npx playwright test --ui
```

### 4. Запуск конкретного тесту
Для запуску лише тестового файлу реєстрації:
```bash
npx playwright test tests/registration.spec.ts
```

### 5. Перегляд HTML-звіту після запуску
Після виконання тестів створюється деталізований HTML-звіт:
```bash
npm run test:report
```
або
```bash
npx playwright show-report
```

---

## 📁 Структура проекту

```
QAuto_playwrigt_sampe/
├── pages/                       # Page Object класи
│   ├── BasePage.ts              # Базовий клас сторінки із загальними методами
│   ├── HomePage.ts              # Головна сторінка QAuto (кнопка Sign up)
│   ├── RegistrationModal.ts     # Модальне вікно реєстрації (поля, валідація, колір рамок)
│   └── GaragePage.ts            # Сторінка Гаража після реєстрації
├── tests/                       # Тестові набори
│   └── registration.spec.ts     # 9 тест-кейсів валідації реєстрації
├── playwright.config.ts         # Конфігурація Playwright (baseURL, HTTP Basic Auth)
├── tsconfig.json                # Конфігурація TypeScript
├── package.json                 # npm залежності та скрипти
└── README.md                    # Інструкція користувача
```

---

## 🔒 HTTP Basic Auth Авторизація

Сайт QAuto вимагає HTTP Basic Auth для доступу. Налаштування авторизації автоматично задано у `playwright.config.ts`:
- **Логін:** `guest`
- **Пароль:** `welcome2qauto`
