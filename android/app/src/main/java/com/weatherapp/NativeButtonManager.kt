package com.weatherapp

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp

class NativeButtonManager(
        private val callerContext: ReactApplicationContext
) : SimpleViewManager<NativeButtonView>() {

    override fun getName() = REACT_CLASS

    companion object {
        const val REACT_CLASS = "RNTNativeButton"
    }

    override fun createViewInstance(context: ThemedReactContext) =
            NativeButtonView(context)

    override fun getExportedCustomBubblingEventTypeConstants(): Map<String, Any> {
        return mapOf(
                "onTouchUpInside" to mapOf(
                        "phasedRegistrationNames" to mapOf(
                                "bubbled" to "onTouchUpInside"
                        )
                )
        )
    }

    @ReactProp(name = "title")
    fun setTitle(view: NativeButtonView, title: String) {
        view.text = title
    }
}