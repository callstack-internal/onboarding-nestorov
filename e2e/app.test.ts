import {expect, device} from 'detox';

describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should load weather', async () => {
    await waitFor(element(by.id('loading')))
      .not.toBeVisible()
      .withTimeout(60000);

    await expect(element(by.text('Paris'))).toBeVisible();
  });

  it('should show humidity after tap', async () => {
    await waitFor(element(by.id('loading')))
      .not.toBeVisible()
      .withTimeout(60000);

    if (device.getPlatform() === 'android') {
      await element(by.text('Paris')).longPress();
    } else {
      await element(by.text('Paris')).tap();
    }
    await waitFor(element(by.id('city')))
      .toBeVisible()
      .withTimeout(5000);
    await expect(element(by.id('humidity'))).toBeVisible();
  });
});
