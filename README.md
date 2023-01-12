# Onboarding project

## Detox

### iOS

```sh
yarn detox.build.ios
yarn detox.test.ios -n "iPhone 14"
```

### Android

```sh
yarn detox.build.android
yarn detox.test.android -n "Pixel_4_API_33"
```

To get all the names of your emulators:

```sh
adb devices | tail -n +2 | cut -sf -1 | xargs -n 1 -I {} bash -c "if [[ '{}' =~ ^emulator--* ]]; then adb -s {} emu avd name | head -n 1; fi"
```

### Android device

```sh
yarn detox.build.android.device
yarn detox.test.android.device
```
