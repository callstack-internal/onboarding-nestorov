#import <UIKit/UIKit.h>

#import "RNTNativeButtonManager.h"
#import "RNTNativeButton.h"

@implementation RNTNativeButtonManager

RCT_EXPORT_MODULE(RNTNativeButton)

RCT_EXPORT_VIEW_PROPERTY(onTouchUpInside, RCTBubblingEventBlock)

RCT_CUSTOM_VIEW_PROPERTY(title, NSString, UIButton) {
  [view setTitle:json forState:UIControlStateNormal];
}

- (UIView *)view {
  return [RNTNativeButton buttonWithType:UIButtonTypeCustom];
}


@end
