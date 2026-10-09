import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { RegistrationModal } from '../pages/RegistrationModal';
import { GaragePage } from '../pages/GaragePage';

test.describe('Тестування форми реєстрації QAuto (Registration Form)', () => {
  let homePage: HomePage;
  let registrationModal: RegistrationModal;

  test.beforeEach(async ({ page }) => {
    // 1. Відкриваємо головну сторінку QAuto
    homePage = new HomePage(page);
    await homePage.openHomePage();

    // 2. Клікаємо кнопку "Sign up" для відкриття модального вікна реєстрації
    registrationModal = await homePage.clickSignUpButton();
  });

  /**
   * Тест-кейс 1: Успішна реєстрація користувача з валідними даними
   */
  test('Успішна реєстрація з коректними даними', async ({ page }) => {
    // Генеруємо унікальний email на основі поточної позначки часу
    const uniqueEmail = `aqa-test-${Date.now()}@test.com`;
    const validPassword = 'Password123';

    // Введення коректних даних у форму реєстрації
    await registrationModal.fillName('John');
    await registrationModal.fillLastName('Doe');
    await registrationModal.fillEmail(uniqueEmail);
    await registrationModal.fillPassword(validPassword);
    await registrationModal.fillRepeatPassword(validPassword);

    // Натискаємо кнопку "Register"
    await registrationModal.clickRegister();

    // Перевіряємо, що після реєстрації відбувся перехід на сторінку Гаража (/panel/garage)
    const garagePage = new GaragePage(page);
    await garagePage.verifyGaragePageIsLoaded();
  });

  /**
   * Тест-кейс 2: Валідація порожнього поля Name
   */
  test('Перевірка помилки при порожньому полі Name', async () => {
    // Клікаємо в поле Name та переводимо фокус на інше поле, не вводячи значення
    await registrationModal.focusOutName();

    // Перевіряємо текст помилки "Name required"
    const errorMessage = await registrationModal.getNameErrorMessage();
    expect(errorMessage).toContain('Name required');

    // Перевіряємо, що рамка поля стала червоною
    await registrationModal.verifyNameBorderIsRed();
  });

  /**
   * Тест-кейс 3: Валідація некоректних символів у полі Name
   */
  test('Перевірка помилки при введенні некоректного символу в поле Name', async () => {
    // Вводимо недопустимий символ '&'
    await registrationModal.fillName('&');
    await registrationModal.focusOutName();

    // Перевіряємо текст помилки "Name is invalid"
    const errorMessage = await registrationModal.getNameErrorMessage();
    expect(errorMessage).toContain('Name is invalid');

    // Перевіряємо червоний колір рамки поля
    await registrationModal.verifyNameBorderIsRed();
  });

  /**
   * Тест-кейс 4: Валідація мінімальної довжини поля Name (1 буква)
   */
  test('Перевірка помилки при введенні імені коротшого за 2 символи', async () => {
    // Вводимо 1 букву 'A' (буква ліквідує помилку недопустимого символу)
    await registrationModal.fillName('A');
    await registrationModal.focusOutName();

    // Перевіряємо текст помилки про недопустиму довжину
    const errorMessage = await registrationModal.getNameErrorMessage();
    expect(errorMessage).toContain('Name has to be from 2 to 20 characters long');

    // Перевіряємо червоний колір рамки поля
    await registrationModal.verifyNameBorderIsRed();
  });

  /**
   * Тест-кейс 5: Валідація максимальної довжини поля Name (21 буква)
   */
  test('Перевірка помилки при введенні імені довшого за 20 символів', async () => {
    // Вводимо 21 букву 'A' (букви не викликають помилки некоректних символів)
    await registrationModal.fillName('A'.repeat(21));
    await registrationModal.focusOutName();

    // Перевіряємо текст помилки про недопустиму довжину
    const errorMessage = await registrationModal.getNameErrorMessage();
    expect(errorMessage).toContain('Name has to be from 2 to 20 characters long');

    // Перевіряємо червоний колір рамки поля
    await registrationModal.verifyNameBorderIsRed();
  });

  /**
   * Тест-кейс 6: Валідація порожнього поля Last Name
   */
  test('Перевірка помилки при порожньому полі Last Name', async () => {
    // Клікаємо в поле Last Name та переводимо фокус на інше поле, не вводячи значення
    await registrationModal.focusOutLastName();

    // Перевіряємо текст помилки "Last name required"
    const errorMessage = await registrationModal.getLastNameErrorMessage();
    expect(errorMessage).toContain('Last name required');

    // Перевіряємо червоний колір рамки поля
    await registrationModal.verifyLastNameBorderIsRed();
  });

  /**
   * Тест-кейс 7: Валідація мінімальної довжини поля Last Name (1 буква)
   */
  test('Перевірка помилки при введенні прізвища коротшого за 2 символи', async () => {
    // Вводимо 1 букву 'A'
    await registrationModal.fillLastName('A');
    await registrationModal.focusOutLastName();

    // Перевіряємо текст помилки про недопустиму довжину
    const errorMessage = await registrationModal.getLastNameErrorMessage();
    expect(errorMessage).toContain('Last name has to be from 2 to 20 characters long');

    // Перевіряємо червоний колір рамки поля
    await registrationModal.verifyLastNameBorderIsRed();
  });

  /**
   * Тест-кейс 8: Валідація некоректних/задовгих даних у полі Last Name (21 символ з тест-кейсу)
   * Примітка: При введенні 21 цифри '123456789101112131415' додаток повертає "Last name is invalid".
   */
  test('Перевірка помилки при введенні прізвища довшого за 20 символів', async () => {
    // Вводимо 21 символ із тест-кейсу ('123456789101112131415')
    await registrationModal.fillLastName('123456789101112131415');
    await registrationModal.focusOutLastName();

    // Отримуємо повідомлення про помилку валідації
    const errorMessage = await registrationModal.getLastNameErrorMessage();
    expect(errorMessage).toContain('Last name is invalid');

    // Перевіряємо червоний колір рамки поля
    await registrationModal.verifyLastNameBorderIsRed();
  });

  /**
   * Тест-кейс 9: Валідація некоректних символів у полі Last Name
   */
  test('Перевірка помилки при введенні некоректного символу в поле Last Name', async () => {
    // Вводимо недопустимий символ '&'
    await registrationModal.fillLastName('&');
    await registrationModal.focusOutLastName();

    // Перевіряємо текст помилки "Last name is invalid"
    const errorMessage = await registrationModal.getLastNameErrorMessage();
    expect(errorMessage).toContain('Last name is invalid');

    // Перевіряємо червоний колір рамки поля
    await registrationModal.verifyLastNameBorderIsRed();
  });
});
