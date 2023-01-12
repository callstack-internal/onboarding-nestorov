
#import "RNTNativeButton.h"

@implementation RNTNativeButton

- (instancetype)initWithFrame:(CGRect)frame {
  self = [super initWithFrame:frame];
  
  if (self) {
    [self addTarget:self
             action:@selector(touchUpInside:)
   forControlEvents:UIControlEventTouchUpInside];
  }
  
  return self;
}

- (void)touchUpInside:(RNTNativeButton *)sender {
  if (sender.onTouchUpInside) {
    sender.onTouchUpInside(nil);
  }
}

@end
