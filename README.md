# Mobile Biometric Auth

Example of the backend biometric auth for  https://github.com/SelfLender/react-native-biometrics

## Postman of curls
https://www.getpostman.com/collections/f7c47d705ddf951c604e

## save public key to server
```
curl --location --request POST 'https://verify-rsa-signature.herokuapp.com/savePublicKey' \
--header 'Content-Type: application/json' \
--data-raw '{
    "publicKey": "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwIZHj8afQhheOqFyJR73iEFjCAkl2LABSue/8rl1Gh/Fkc6ct75B3Xursv2Vr4BfVsHP4DPqaN+ys3/md91iPBbPCeFv/FOn4RUbDBXAMe/QToh/loL0lApnmwXZ13KcZAS7zVRe45+ahLE3EyJDJLroRbyTchGzmnDynLezVU8SVTH7tPpCW4QH6Xed2e0kS8GPN/SUgYtFQ3Il9cVDEMoAPVO89T1oKKKWFzHsKgfkOqNn2D9Yc3k0vP8MBxPS9oDdpJBRsK+LjHeHf8RutcO8uakBs6sjKcsba32OCQI89GLPO1agw+bAS8V5UR2+LTn+t4MyPS2hGbP7w2W2CwIDAQAB",
    "deviceId": "123"
}'
```

## validate private key with server
```
curl --location --request POST 'https://verify-rsa-signature.herokuapp.com/verifySignature' \
--header 'Content-Type: application/json' \
--data-raw '{
    "deviceId": "123",
    "payload": "decrypt this 1616627381 0.3233719528696505",
    "signature": "o3TsjU99gzDYYqlWtMkp9Pb3ZW05zz+l8RImAqKoAYasDPAK7gzG0VmONFY0EQ/wN6NiFw+w0JF36M2snwQ0RngpQdn/COfD3NituKrLETuOQXrZwvDxAgpdfZGuTfd5PSHYdTBrkFTwKCgNojIkLbjKtBlSwbuyN6Mj3cKBNuuuSRrH4r75p4WKmMmIBNy55ImW/qmK1E40WFPPx7FLRFJm1cdJDGKd/5HH0+nOEo1NTszb2NVPu8nKZuq/OmaoiLQ2GnnRfyj5L0M15SKgJD7jpUWZ3RA66Z5J5vzmRlsxwB0Zp1AgdEvXFyOAVr15adga2vj4RmZXOrdlOKGSbw=="
}'
```

## delete key
```
curl --location --request DELETE 'https://verify-rsa-signature.herokuapp.com/deletePublicKey' \
--header 'Content-Type: application/json' \
--data-raw '{
    "deviceId": "123"
}'
```

## view keys
https://verify-rsa-signature.herokuapp.com/

## deploy

```
heroku login
git push heroku master
```