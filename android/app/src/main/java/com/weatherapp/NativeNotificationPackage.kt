package com.weatherapp

import android.view.View
import com.facebook.react.ReactPackage
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.SimpleViewManager

class NativeNotificationPackage : ReactPackage {
    override fun createNativeModules(reactContext: ReactApplicationContext) =
            listOf(NativeNotificationModule(reactContext))

    override fun createViewManagers(_c: ReactApplicationContext) = emptyList<SimpleViewManager<View>>()
}