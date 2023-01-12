package com.weatherapp

import android.content.Context
import androidx.appcompat.widget.AppCompatButton
import com.facebook.react.bridge.ReactContext
import com.facebook.react.uimanager.events.RCTEventEmitter

class NativeButtonView : AppCompatButton {
    constructor(context: Context) : super(context) {
        setOnClickListener {
            (context as ReactContext)
                    .getJSModule(RCTEventEmitter::class.java)
                    .receiveEvent(id, "onTouchUpInside", null)
        }
    }
}