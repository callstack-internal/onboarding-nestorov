package com.weatherapp

import android.app.NotificationChannel
import android.app.NotificationManager
import android.os.Build
import androidx.core.app.NotificationCompat
import androidx.core.app.NotificationManagerCompat
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod


class NativeNotificationModule(context: ReactApplicationContext?) : ReactContextBaseJavaModule(context) {

    private var notificationChannelId = "NativeNotificationModule"

    override fun getName(): String {
        return "RNTNativeNotification"
    }

    @ReactMethod
    fun showNotification(title: String?, body: String?) {
        val builder: NotificationCompat.Builder = NotificationCompat.Builder(reactApplicationContext, notificationChannelId)
                .setSmallIcon(android.R.drawable.arrow_up_float)
                .setContentTitle(title)
                .setContentText(body)
                .setPriority(NotificationCompat.PRIORITY_DEFAULT)
        val notificationManager: NotificationManagerCompat = NotificationManagerCompat.from(reactApplicationContext)
        notificationManager.notify(666, builder.build()) // Show notification
    }

    private fun createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val name: CharSequence = "Our channel name"
            val description = "Channel discription"
            val importance = NotificationManager.IMPORTANCE_DEFAULT
            val channel = NotificationChannel(notificationChannelId, name, importance)
            channel.description = description
            val notificationManager = reactApplicationContext.getSystemService(NotificationManager::class.java)
            notificationManager.createNotificationChannel(channel)
        }
    }

    init {
        createNotificationChannel()
    }
}