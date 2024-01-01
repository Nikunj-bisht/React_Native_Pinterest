//
//  StorageBridge.m
//  Pinterest
//
//  Created by Taxmann_Technologies on 29/12/23.
//

#import <Foundation/Foundation.h>
#import "React/RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(StorageHelper,NSObject)
RCT_EXTERN_METHOD(storeData:(RCTResponseSenderBlock) callback)
    
@end
