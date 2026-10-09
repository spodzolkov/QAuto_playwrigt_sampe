import { defineConfig, devices } from '@playwright/test';

/**
 * Конфігураційний файл Playwright для тестування веб-сайту QAuto.
 */
export default defineConfig({
  testDir: './tests',
  /* Максимальний час виконання одного тесту */
  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },
  /* Запуск тестів паралельно */
  fullyParallel: true,
  /* Заборона фокусних тестів в CI */
  forbidOnly: !!process.env.CI,
  /* Кількість повторів невдалих тестів */
  retries: process.env.CI ? 2 : 0,
  /* Кількість воркерів */
  workers: process.env.CI ? 2 : undefined,
  /* Формат звіту про проходження тестів */
  reporter: [
    ['html', { open: 'never' }],
    ['list']
  ],
  /* Спільні налаштування для всіх тестів */
  use: {
    /* Базовий URL для переходів (page.goto('/')) */
    baseURL: 'https://qauto2.forstudy.space/',

    /* HTTP Basic авторизація для доступу до тестового стенду */
    httpCredentials: {
      username: 'guest',
      password: 'welcome2qauto'
    },

    /* Скріншоти та відео при помилках */
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },

  /* Конфігурація розширень / браузерів */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
