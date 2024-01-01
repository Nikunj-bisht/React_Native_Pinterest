//
//  Storage.swift
//  Pinterest
//
//  Created by Taxmann_Technologies on 29/12/23.
//

import Foundation

@objc(StorageHelper) class StorageHelper : NSObject{
  @objc static func requiresMainQueueSetup()->Bool{
    return true;
  }
  @objc func storeData(callback : RCTResponseSenderBlock){
    let defaults = UserDefaults.standard;
    
  }
}
