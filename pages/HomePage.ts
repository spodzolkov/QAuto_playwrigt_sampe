import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { RegistrationModal } from './RegistrationModal';

/**
 * Клас опису головної (стартової) сторінки QAuto (HomePage).
 */
export class HomePage extends BasePage {
  /** Локатор кнопки "Sign up" на головній сторінці */
  private readonly signUpButton: Locator;

  constructor(page: Page) {
    super(page);
    // Пошук кнопки "Sign up" (за текстом або роллю)
    this.signUpButton = page.locator('button:has-text("Sign up"), .hero-descriptor_btn');
  }

  /**
   * Відкрити головну сторінку QAuto
   */
  async openHomePage(): Promise<void> {
    await this.open('/');
  }

  /**
   * Натиснути кнопку "Sign up" для відкриття модального вікна реєстрації
   * @returns Екземпляр модального вікна реєстрації (RegistrationModal)
   */
  async clickSignUpButton(): Promise<RegistrationModal> {
    await this.signUpButton.click();
    const registrationModal = new RegistrationModal(this.page);
    await registrationModal.waitForModalVisible();
    return registrationModal;
  }
}
