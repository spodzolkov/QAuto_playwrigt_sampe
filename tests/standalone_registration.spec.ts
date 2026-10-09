import { test, expect } from '@playwright/test';

/**
 * Тестовий сюїт без використання Page Object Model та без залежності від playwright.config.ts
 * Усі URL вказуються явно з HTTP авторизацією, а взаємодія з елементами здійснюється безпосередньо через Playwright Locators.
 */
test.describe('Тестування форми реєстрації QAuto (без Page Object та Config)', () => {
  // Повний URL з вбудованими HTTP Basic Auth обліковими даними (guest:welcome2qauto)
  const BASE_URL = 'https://guest:welcome2qauto@qauto2.forstudy.space/';

  test.beforeEach(async ({ page }) => {
    // 1. Відкриваємо головну сторінку з явним URL
    await page.goto(BASE_URL);

    // 2. Клікаємо кнопку "Sign up" для відкриття модального вікна реєстрації
    const signUpButton = page.locator('button:has-text("Sign up"), .hero-descriptor_btn');
    await signUpButton.click();

    // 3. Переконуємось, що модальне вікно завантажилось та відображається
    const modalContainer = page.locator('.modal-content');
    await expect(modalContainer).toBeVisible();
  });

  /**
   * Тест-кейс 1: Успішна реєстрація користувача з валідними даними
   */
  test('Успішна реєстрація з коректними даними', async ({ page }) => {
    const uniqueEmail = `aqa-test-${Date.now()}@test.com`;
    const validPassword = 'Password123';

    // Заповнюємо форму реєстрації
    await page.locator('#signupName').fill('John');
    await page.locator('#signupLastName').fill('Doe');
    await page.locator('#signupEmail').fill(uniqueEmail);
    await page.locator('#signupPassword').fill(validPassword);
    await page.locator('#signupRepeatPassword').fill(validPassword);

    // Натискаємо кнопку реєстрації
    await page.locator('.modal-footer .btn-primary').click();

    // Перевіряємо успішний перехід на сторінку Гаража (/panel/garage)
    await expect(page).toHaveURL(/.*\/panel\/garage/);
    await expect(page.locator('h1')).toHaveText('Garage');
  });

  /**
   * Тест-кейс 2: Валідація порожнього поля Name
   */
  test('Перевірка помилки при порожньому полі Name', async ({ page }) => {
    const nameInput = page.locator('#signupName');
    
    // Переводимо фокус та знімаємо його для активації триггера валідації
    await nameInput.focus();
    await nameInput.blur();

    // Перевіряємо текст помилки
    const errorLocator = page.locator('#signupName ~ .invalid-feedback');
    await expect(errorLocator).toBeVisible();
    await expect(errorLocator).toContainText('Name required');

    // Перевіряємо клас помилки та червоний колір рамки
    await expect(nameInput).toHaveClass(/is-invalid|ng-invalid/);
    const borderColor = await nameInput.evaluate((el) => window.getComputedStyle(el).borderColor);
    expect(borderColor).toMatch(/rgb\((?:19[0-9]|2[0-5][0-9]),\s*\d+,\s*\d+\)|#dc3545|red/i);
  });

  /**
   * Тест-кейс 3: Валідація некоректних символів у полі Name
   */
  test('Перевірка помилки при введенні некоректного символу в поле Name', async ({ page }) => {
    const nameInput = page.locator('#signupName');

    await nameInput.fill('&');
    await nameInput.blur();

    const errorLocator = page.locator('#signupName ~ .invalid-feedback');
    await expect(errorLocator).toBeVisible();
    await expect(errorLocator).toContainText('Name is invalid');

    await expect(nameInput).toHaveClass(/is-invalid|ng-invalid/);
    const borderColor = await nameInput.evaluate((el) => window.getComputedStyle(el).borderColor);
    expect(borderColor).toMatch(/rgb\((?:19[0-9]|2[0-5][0-9]),\s*\d+,\s*\d+\)|#dc3545|red/i);
  });

  /**
   * Тест-кейс 4: Валідація мінімальної довжини поля Name (1 символ)
   */
  test('Перевірка помилки при введенні імені коротшого за 2 символи', async ({ page }) => {
    const nameInput = page.locator('#signupName');

    await nameInput.fill('A');
    await nameInput.blur();

    const errorLocator = page.locator('#signupName ~ .invalid-feedback');
    await expect(errorLocator).toBeVisible();
    await expect(errorLocator).toContainText('Name has to be from 2 to 20 characters long');

    await expect(nameInput).toHaveClass(/is-invalid|ng-invalid/);
    const borderColor = await nameInput.evaluate((el) => window.getComputedStyle(el).borderColor);
    expect(borderColor).toMatch(/rgb\((?:19[0-9]|2[0-5][0-9]),\s*\d+,\s*\d+\)|#dc3545|red/i);
  });

  /**
   * Тест-кейс 5: Валідація максимальної довжини поля Name (21 символ)
   */
  test('Перевірка помилки при введенні імені довшого за 20 символів', async ({ page }) => {
    const nameInput = page.locator('#signupName');

    await nameInput.fill('A'.repeat(21));
    await nameInput.blur();

    const errorLocator = page.locator('#signupName ~ .invalid-feedback');
    await expect(errorLocator).toBeVisible();
    await expect(errorLocator).toContainText('Name has to be from 2 to 20 characters long');

    await expect(nameInput).toHaveClass(/is-invalid|ng-invalid/);
    const borderColor = await nameInput.evaluate((el) => window.getComputedStyle(el).borderColor);
    expect(borderColor).toMatch(/rgb\((?:19[0-9]|2[0-5][0-9]),\s*\d+,\s*\d+\)|#dc3545|red/i);
  });

  /**
   * Тест-кейс 6: Валідація порожнього поля Last Name
   */
  test('Перевірка помилки при порожньому полі Last Name', async ({ page }) => {
    const lastNameInput = page.locator('#signupLastName');

    await lastNameInput.focus();
    await lastNameInput.blur();

    const errorLocator = page.locator('#signupLastName ~ .invalid-feedback');
    await expect(errorLocator).toBeVisible();
    await expect(errorLocator).toContainText('Last name required');

    await expect(lastNameInput).toHaveClass(/is-invalid|ng-invalid/);
    const borderColor = await lastNameInput.evaluate((el) => window.getComputedStyle(el).borderColor);
    expect(borderColor).toMatch(/rgb\((?:19[0-9]|2[0-5][0-9]),\s*\d+,\s*\d+\)|#dc3545|red/i);
  });

  /**
   * Тест-кейс 7: Валідація мінімальної довжини поля Last Name (1 символ)
   */
  test('Перевірка помилки при введенні прізвища коротшого за 2 символи', async ({ page }) => {
    const lastNameInput = page.locator('#signupLastName');

    await lastNameInput.fill('A');
    await lastNameInput.blur();

    const errorLocator = page.locator('#signupLastName ~ .invalid-feedback');
    await expect(errorLocator).toBeVisible();
    await expect(errorLocator).toContainText('Last name has to be from 2 to 20 characters long');

    await expect(lastNameInput).toHaveClass(/is-invalid|ng-invalid/);
    const borderColor = await lastNameInput.evaluate((el) => window.getComputedStyle(el).borderColor);
    expect(borderColor).toMatch(/rgb\((?:19[0-9]|2[0-5][0-9]),\s*\d+,\s*\d+\)|#dc3545|red/i);
  });

  /**
   * Тест-кейс 8: Валідація невалідної довжини/символів поля Last Name
   */
  test('Перевірка помилки при введенні прізвища довшого за 20 символів', async ({ page }) => {
    const lastNameInput = page.locator('#signupLastName');

    await lastNameInput.fill('123456789101112131415');
    await lastNameInput.blur();

    const errorLocator = page.locator('#signupLastName ~ .invalid-feedback');
    await expect(errorLocator).toBeVisible();
    await expect(errorLocator).toContainText('Last name is invalid');

    await expect(lastNameInput).toHaveClass(/is-invalid|ng-invalid/);
    const borderColor = await lastNameInput.evaluate((el) => window.getComputedStyle(el).borderColor);
    expect(borderColor).toMatch(/rgb\((?:19[0-9]|2[0-5][0-9]),\s*\d+,\s*\d+\)|#dc3545|red/i);
  });

  /**
   * Тест-кейс 9: Валідація некоректних символів у полі Last Name
   */
  test('Перевірка помилки при введенні некоректного символу в поле Last Name', async ({ page }) => {
    const lastNameInput = page.locator('#signupLastName');

    await lastNameInput.fill('&');
    await lastNameInput.blur();

    const errorLocator = page.locator('#signupLastName ~ .invalid-feedback');
    await expect(errorLocator).toBeVisible();
    await expect(errorLocator).toContainText('Last name is invalid');

    await expect(lastNameInput).toHaveClass(/is-invalid|ng-invalid/);
    const borderColor = await lastNameInput.evaluate((el) => window.getComputedStyle(el).borderColor);
    expect(borderColor).toMatch(/rgb\((?:19[0-9]|2[0-5][0-9]),\s*\d+,\s*\d+\)|#dc3545|red/i);
  });
});
