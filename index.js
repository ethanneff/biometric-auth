const express = require("express");
const NodeRSA = require("node-rsa");
const app = express();
const db = {};
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_, res) => {
  res.json({ success: true, data: db });
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

app.post("/savePublicKey", (req, res) => {
  try {
    const publicKey = req.body.publicKey;
    const deviceId = req.body.deviceId;
    db[deviceId] = publicKey;
    res.json({ success: true });
  } catch (e) {
    res.json({ success: false });
  }
});

app.delete("/deletePublicKey", (req, res) => {
  try {
    const deviceId = req.body.deviceId;
    delete db[deviceId];
    res.json({ success: true });
  } catch (e) {
    res.json({ success: false });
  }
});

app.listen(process.env.PORT || 3333);
