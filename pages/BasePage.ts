import { Page } from '@playwright/test';

/**
 * Базовий клас для всіх сторінок (BasePage).
 * Містить загальну логіку роботи з Playwright Page та базові методи навігації.
 */
export class BasePage {
  protected readonly page: Page;

  /**
   * Конструктор базової сторінки
   * @param page Екземпляр сторінки Playwright
   */
  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Відкрити вказаний URL шлях
   * @param path Відносний або абсолютний шлях
   */
  async open(path: string = '/'): Promise<void> {
    await this.page.goto(path);
  }

  /**
   * Отримати поточний URL сторінки
   */
  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  /**
   * Отримати заголовок сторінки
   */
  async getTitle(): Promise<string> {
    return this.page.title();
  }
}
