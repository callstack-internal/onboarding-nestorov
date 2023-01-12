import {expect, device} from 'detox';

describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp({permissions: {notifications: 'YES'}});
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

  it('native button should show alert after tap', async () => {
    await waitFor(element(by.id('loading')))
      .not.toBeVisible()
      .withTimeout(5000);

    if (device.getPlatform() === 'android') {
      await element(by.text('Paris')).longPress();
    } else {
      await element(by.text('Paris')).tap();
    }

    if (device.getPlatform() === 'android') {
      await element(by.text('THIS TITLE IS A PROP')).longPress();
    } else {
      await element(by.text('This title is a prop')).tap();
    }

    await expect(
      element(
        by.text(
          'The native button was tapped. This alert is created by the JavaScript thread.',
        ),
      ),
    ).toBeVisible();
  });
});
