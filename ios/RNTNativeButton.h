#import <UIKit/UIKit.h>
#import <React/RCTComponent.h>

NS_ASSUME_NONNULL_BEGIN

@interface RNTNativeButton : UIButton

@property (nonatomic, copy) RCTBubblingEventBlock onTouchUpInside;

@end

NS_ASSUME_NONNULL_END
