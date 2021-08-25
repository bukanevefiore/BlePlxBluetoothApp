/*
Güncelleme yapmadan önce okuma

const a = {"_manager": {
    "_activePromises": {}, 
    "_activeSubscriptions": {}, 
    "_errorCodesToMessagesMapping": {
        "0": "Unknown error occurred. This is probably a bug! Check reason property.", 
        "1": "BleManager was destroyed",
        "100": "BluetoothLE is unsupported on this device", 
        "101": "Device is not authorized to use BluetoothLE", 
        "102": "BluetoothLE is powered off", 
        "103": "BluetoothLE is in unknown state", 
        "104": "BluetoothLE is resetting", 
        "105": "Bluetooth state change failed", 
        "2": "Operation was cancelled", 
        "200": "Device {deviceID} connection failed", 
        "201": "Device {deviceID} was disconnected", 
        "202": "RSSI read failed for device {deviceID}", 
        "203": "Device {deviceID} is already connected", 
        "204": "Device {deviceID} not found", 
        "205": "Device {deviceID} is not connected", 
        "206": "Device {deviceID} could not change MTU size", 
        "3": "Operation timed out", 
        "300": "Services discovery failed for device {deviceID}", 
        "301": "Included services discovery failed for device {deviceID} and service: {serviceUUID}", 
        "302": "Service {serviceUUID} for device {deviceID} not found", 
        "303": "Services not discovered for device {deviceID}", 
        "4": "Operation was rejected", 
        "400": "Characteristic discovery failed for device {deviceID} and service {serviceUUID}", 
        "401": "Characteristic {characteristicUUID} write failed for device {deviceID} and service {serviceUUID}", 
        "402": "Characteristic {characteristicUUID} read failed for device {deviceID} and service {serviceUUID}", 
        "403": "Characteristic {characteristicUUID} notify change failed for device {deviceID} and service {serviceUUID}", 
        "404": "Characteristic {characteristicUUID} not found", 
        "405": "Characteristics not discovered for device {deviceID} and service {serviceUUID}", 
        "406": "Cannot write to characteristic {characteristicUUID} with invalid data format: {internalMessage}", 
        "5": "Invalid UUIDs or IDs were passed: {internalMessage}", 
        "500": "Descriptor {descriptorUUID} discovery failed for device {deviceID}, service {serviceUUID} and characteristic {characteristicUUID}", 
        "501": "Descriptor {descriptorUUID} write failed for device {deviceID}, service {serviceUUID} and characteristic {characteristicUUID}", 
        "502": "Descriptor {descriptorUUID} read failed for device {deviceID}, service {serviceUUID} and characteristic {characteristicUUID}", 
        "503": "Descriptor {descriptorUUID} not found",
        "504": "Descriptors not discovered for device {deviceID}, service {serviceUUID} and characteristic {characteristicUUID}", 
        "505": "Cannot write to descriptor {descriptorUUID} with invalid data format: {internalMessage}", 
        "506": "Cannot write to descriptor {descriptorUUID}. It's not allowed by iOS and therefore forbidden on Android as well.", 
        "600": "Cannot start scanning operation", 
        "601": "Location services are disabled"}, 
        "_eventEmitter": {
            "_disableCallsIntoModule": false, 
            "_subscriber": [EventSubscriptionVendor]}, 
            "_scanEventSubscription": {
                "context": undefined, 
                "emitter": [NativeEventEmitter], 
        "eventType": "ScanEvent", 
        "key": 0, 
        "listener": [Function scanListener], 
        "subscriber": [EventSubscriptionVendor]}, 
        "_uniqueId": 86}, "deviceID": "EF:D2:7B:5E:7E:74", 
        "id": 20, 
        "isIndicatable": false,
         "isNotifiable": false, 
         "isNotifying": false, 
         "isReadable": true, 
         "isWritableWithResponse": true, 
         "isWritableWithoutResponse": true, 
         "serviceID": 19, 
        "serviceUUID": "0000a234-b38d-4985-720e-0f993a68ee41",
         "uuid": "0000a235-b38d-4985-720e-0f993a68ee41", 
"value": "DAEaYQ=="}
---------------------------------------------------------------------------------------
güncelleme yaptıktan sonra okuma
veriler
 LOG  clickedCharacteristicUuid:0000a235-b38d-4985-720e-0f993a68ee41
 LOG  clickedServiceUuid:0000a234-b38d-4985-720e-0f993a68ee41
 LOG  clickedFormat:
 LOG  Input Value:5
 LOG  {"_manager": {"_activePromises": {}, "_activeSubscriptions": {}, "_errorCodesToMessagesMapping": {"0": "Unknown error occurred. This is probably a bug! Check reason property.", "1": "BleManager was destroyed", "100": "BluetoothLE is unsupported on this device", "101": "Device is not authorized to use BluetoothLE", "102": "BluetoothLE is powered off", "103": "BluetoothLE is in unknown state", "104": "BluetoothLE is resetting", "105": "Bluetooth state change failed", "2": "Operation was cancelled", "200": "Device {deviceID} connection failed", "201": "Device {deviceID} was disconnected", "202": "RSSI read failed for device {deviceID}", "203": "Device {deviceID} is already connected", "204": "Device {deviceID} not found", "205": "Device {deviceID} is not connected", "206": "Device {deviceID} could not change MTU size", "3": "Operation timed out", "300": "Services discovery failed for device {deviceID}", "301": "Included services discovery failed for device {deviceID} and service: {serviceUUID}", "302": "Service {serviceUUID} for device {deviceID} not found", "303": "Services not discovered for device {deviceID}", "4": "Operation was rejected", "400": "Characteristic discovery failed for device {deviceID} and service {serviceUUID}",
  "401": "Characteristic {characteristicUUID} write failed for device {deviceID} and service {serviceUUID}", "402": "Characteristic {characteristicUUID} read failed for device {deviceID} and service {serviceUUID}", "403": "Characteristic {characteristicUUID} notify change failed for device {deviceID} and service {serviceUUID}", "404": "Characteristic {characteristicUUID} not found", "405": "Characteristics not discovered for device {deviceID} and service {serviceUUID}", "406": "Cannot write to characteristic {characteristicUUID} with invalid data format: {internalMessage}", "5": "Invalid UUIDs or IDs were passed: {internalMessage}", "500": "Descriptor {descriptorUUID} discovery failed for device {deviceID}, service {serviceUUID} and characteristic {characteristicUUID}", "501": "Descriptor {descriptorUUID} write failed for device {deviceID}, service {serviceUUID} and characteristic {characteristicUUID}", "502": "Descriptor {descriptorUUID} read failed for device {deviceID}, service {serviceUUID} and characteristic {characteristicUUID}", "503": "Descriptor {descriptorUUID} not found", "504": "Descriptors not discovered for device {deviceID}, service {serviceUUID} and characteristic {characteristicUUID}", "505": "Cannot write to descriptor {descriptorUUID} with invalid data format: {internalMessage}", "506": "Cannot write to descriptor {descriptorUUID}. It's not allowed by iOS and therefore forbidden on Android as well.", "600": "Cannot start scanning operation", "601": "Location services are disabled"}, "_eventEmitter": {"_disableCallsIntoModule": false, "_subscriber": [EventSubscriptionVendor]}, "_scanEventSubscription": {"context": undefined, "emitter": [NativeEventEmitter], "eventType": "ScanEvent", "key": 0, "listener": [Function scanListener], "subscriber": [EventSubscriptionVendor]}, "_uniqueId": 77}, "deviceID": "EF:D2:7B:5E:7E:74", "id": 20, "isIndicatable": false, "isNotifiable": false, "isNotifying": false, "isReadable": true, "isWritableWithResponse": true, "isWritableWithoutResponse": true, 
  "serviceID": 19, 
  "serviceUUID": "0000a234-b38d-4985-720e-0f993a68ee41", 
  "uuid": "0000a235-b38d-4985-720e-0f993a68ee41", "value": "BQAAAA=="}

  -----------------------------------------------------------------------------------------


  name:
  AAAAAA==
  FgAAAA==   =>   22
  16000000   =>   Hex Kod


*/
