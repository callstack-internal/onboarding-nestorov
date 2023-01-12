#import <UIKit/UIKit.h>
#import <UserNotifications/UserNotifications.h>
#import "RNTNativeNotification.h"

@implementation RNTNativeNotification

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(showNotification:(NSString *)title body:(NSString *)body) {
  UNMutableNotificationContent *content = [UNMutableNotificationContent new];
  content.title = title;
  content.body = body;
  content.sound = UNNotificationSound.defaultSound;
  
  UNTimeIntervalNotificationTrigger *trigger = [UNTimeIntervalNotificationTrigger
                                                triggerWithTimeInterval:0.1f
                                                repeats:NO];
  
  UNNotificationRequest *request = [UNNotificationRequest
                                    requestWithIdentifier:@"request"
                                    content:content
                                    trigger:trigger];
  
  UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
  dispatch_async(dispatch_get_main_queue(), ^{
    [center addNotificationRequest:request withCompletionHandler:nil];
  });
}

@end
