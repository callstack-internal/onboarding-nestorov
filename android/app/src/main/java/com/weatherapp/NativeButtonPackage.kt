@file:JvmName("NativeButtonPackage")

package com.weatherapp

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext

class NativeButtonPackage : ReactPackage {
    override fun createNativeModules(p0: ReactApplicationContext) = emptyList<NativeModule>()

    override fun createViewManagers(
            reactContext: ReactApplicationContext
    ) = listOf(NativeButtonManager(reactContext))
}