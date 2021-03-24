const express = require("express");
const NodeRSA = require("node-rsa");
const app = express();
const db = {};
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/verifySignature", (req, res) => {
  try {
    const deviceId = req.body.deviceId;
    const payload = req.body.payload;
    const signature = req.body.signature;
    const publicKey = db[deviceId];
    const publicKeyBuffer = Buffer.from(publicKey, "base64");
    const key = new NodeRSA();
    const signer = key.importKey(publicKeyBuffer, "public-der");
    const buffer = Buffer.from(payload);
    const verified = signer.verify(buffer, signature, "utf8", "base64");
    res.json({ success: verified });
  } catch (e) {
    res.json({ success: false });
  }
});

app.post("/saveBiometricPublicKey", (req, res) => {
  try {
    const biometricPublicKey = req.body.biometricPublicKey;
    const deviceId = req.body.deviceId;
    db[deviceId] = biometricPublicKey;
    res.json({ success: true });
  } catch (e) {
    res.json({ success: false });
  }
});

app.get("/getBiometricPublicKey", (req, res) => {
  try {
    res.json({ success: true, data: db });
  } catch (e) {
    res.json({ success: false });
  }
});

app.listen(process.env.PORT || 3333);

// const publicKey =
//   "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwIZHj8afQhheOqFyJR73iEFjCAkl2LABSue/8rl1Gh/Fkc6ct75B3Xursv2Vr4BfVsHP4DPqaN+ys3/md91iPBbPCeFv/FOn4RUbDBXAMe/QToh/loL0lApnmwXZ13KcZAS7zVRe45+ahLE3EyJDJLroRbyTchGzmnDynLezVU8SVTH7tPpCW4QH6Xed2e0kS8GPN/SUgYtFQ3Il9cVDEMoAPVO89T1oKKKWFzHsKgfkOqNn2D9Yc3k0vP8MBxPS9oDdpJBRsK+LjHeHf8RutcO8uakBs6sjKcsba32OCQI89GLPO1agw+bAS8V5UR2+LTn+t4MyPS2hGbP7w2W2CwIDAQAB";
// const payload = "decrypt this 1616627381 0.3233719528696505";
// const signature =
//   "o3TsjU99gzDYYqlWtMkp9Pb3ZW05zz+l8RImAqKoAYasDPAK7gzG0VmONFY0EQ/wN6NiFw+w0JF36M2snwQ0RngpQdn/COfD3NituKrLETuOQXrZwvDxAgpdfZGuTfd5PSHYdTBrkFTwKCgNojIkLbjKtBlSwbuyN6Mj3cKBNuuuSRrH4r75p4WKmMmIBNy55ImW/qmK1E40WFPPx7FLRFJm1cdJDGKd/5HH0+nOEo1NTszb2NVPu8nKZuq/OmaoiLQ2GnnRfyj5L0M15SKgJD7jpUWZ3RA66Z5J5vzmRlsxwB0Zp1AgdEvXFyOAVr15adga2vj4RmZXOrdlOKGSbw==";
