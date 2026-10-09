import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Клас опису сторінки Гаража (GaragePage), яка відкривається після успішного входу/реєстрації.
 */
export class GaragePage extends BasePage {
  readonly garageHeading: Locator;
  readonly profileMenuButton: Locator;

  constructor(page: Page) {
    super(page);
    this.garageHeading = page.locator('h1:has-text("Garage")');
    this.profileMenuButton = page.locator('#userNavDropdown');
  }

  /**
   * Перевірка успішного переходу на сторінку Гаража
   */
  async verifyGaragePageIsLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/\/panel\/garage/);
    await expect(this.garageHeading).toBeVisible({ timeout: 10000 });
  }
}
