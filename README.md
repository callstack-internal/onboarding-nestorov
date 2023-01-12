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

To get all the names of your running emulators:

```sh
adb devices | grep emulator | cut -f1 | while read line; do adb -s $line emu avd name | head -n 1; done
```

### Android device

```sh
yarn detox.build.android.device
yarn detox.test.android.device
```
