import { Page, Locator, expect } from '@playwright/test';

/**
 * Модальне вікно реєстрації (RegistrationModal).
 * Містить локатори полів введення, кнопок та повідомлень валідації.
 */
export class RegistrationModal {
  private readonly page: Page;

  /** Елементи модального вікна */
  readonly modalContainer: Locator;
  readonly nameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly repeatPasswordInput: Locator;
  readonly registerButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.modalContainer = page.locator('.modal-content');
    this.nameInput = page.locator('#signupName');
    this.lastNameInput = page.locator('#signupLastName');
    this.emailInput = page.locator('#signupEmail');
    this.passwordInput = page.locator('#signupPassword');
    this.repeatPasswordInput = page.locator('#signupRepeatPassword');
    this.registerButton = page.locator('.modal-footer .btn-primary');
  }

  /**
   * Очікування появи модального вікна
   */
  async waitForModalVisible(): Promise<void> {
    await this.modalContainer.waitFor({ state: 'visible' });
  }

  /**
   * Ввести ім'я в поле Name
   * @param name Значення для введення
   */
  async fillName(name: string): Promise<void> {
    await this.nameInput.fill(name);
  }

  /**
   * Ввести прізвище в поле Last Name
   * @param lastName Значення для введення
   */
  async fillLastName(lastName: string): Promise<void> {
    await this.lastNameInput.fill(lastName);
  }

  /**
   * Ввести Email в поле Email
   * @param email Значення для введення
   */
  async fillEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
  }

  /**
   * Ввести пароль в поле Password
   * @param password Значення для введення
   */
  async fillPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  /**
   * Ввести підтвердження пароля в поле Re-enter password
   * @param password Значення для введення
   */
  async fillRepeatPassword(password: string): Promise<void> {
    await this.repeatPasswordInput.fill(password);
  }

  /**
   * Зняття фокусу з поля Name для активації валідації (focus + blur)
   */
  async focusOutName(): Promise<void> {
    await this.nameInput.focus();
    await this.nameInput.blur();
  }

  /**
   * Зняття фокусу з поля Last Name для активації валідації (focus + blur)
   */
  async focusOutLastName(): Promise<void> {
    await this.lastNameInput.focus();
    await this.lastNameInput.blur();
  }




  /**
   * Натиснути кнопку "Register"
   */
  async clickRegister(): Promise<void> {
    await this.registerButton.click();
  }

  /**
   * Отримати текст повідомлення про помилку для поля Name
   */
  async getNameErrorMessage(): Promise<string> {
    const errorLocator = this.page.locator('#signupName ~ .invalid-feedback');
    await errorLocator.waitFor({ state: 'visible' });
    return (await errorLocator.textContent())?.trim() || '';
  }

  /**
   * Отримати текст повідомлення про помилку для поля Last Name
   */
  async getLastNameErrorMessage(): Promise<string> {
    const errorLocator = this.page.locator('#signupLastName ~ .invalid-feedback');
    await errorLocator.waitFor({ state: 'visible' });
    return (await errorLocator.textContent())?.trim() || '';
  }


  /**
   * Отримати колір рамки (border-color) для поля Name
   */
  async getNameBorderColor(): Promise<string> {
    return this.nameInput.evaluate((el) => {
      return window.getComputedStyle(el).borderColor;
    });
  }

  /**
   * Отримати колір рамки (border-color) для поля Last Name
   */
  async getLastNameBorderColor(): Promise<string> {
    return this.lastNameInput.evaluate((el) => {
      return window.getComputedStyle(el).borderColor;
    });
  }

  /**
   * Перевірка, що поле Name позначене як невалідне (клас is-invalid / ng-invalid та червона рамка)
   */
  async verifyNameBorderIsRed(): Promise<void> {
    await expect(this.nameInput).toHaveClass(/is-invalid|ng-invalid/);
    const borderColor = await this.getNameBorderColor();
    expect(borderColor).toMatch(/rgb\((?:19[0-9]|2[0-5][0-9]),\s*\d+,\s*\d+\)|#dc3545|red/i);
  }

  /**
   * Перевірка, що поле Last Name позначене як невалідне (клас is-invalid / ng-invalid та червона рамка)
   */
  async verifyLastNameBorderIsRed(): Promise<void> {
    await expect(this.lastNameInput).toHaveClass(/is-invalid|ng-invalid/);
    const borderColor = await this.getLastNameBorderColor();
    expect(borderColor).toMatch(/rgb\((?:19[0-9]|2[0-5][0-9]),\s*\d+,\s*\d+\)|#dc3545|red/i);
  }
}
