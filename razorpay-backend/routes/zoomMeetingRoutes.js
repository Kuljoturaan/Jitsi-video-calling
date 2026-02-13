const express = require("express");
const router = express.Router();
const crypto = require("crypto");
require("dotenv").config();

router.post("/zoom-signature", (req, res) => {
  try {
    const { meetingNumber, userEmail } = req.body;
    const sdkKey = process.env.SDK_KEY;
    const sdkSecret = process.env.SDK_SECRET;
    const adminEmail = process.env.ADMIN_EMAIL;

    // 1. Role Logic: Admin email check
    let role = userEmail === adminEmail ? 1 : 0;

    // 2. JWT Timing Logic
    // const iat = Math.round(new Date().getTime() / 1000) - 30;
    // const exp = iat + 60 * 60 * 2;

    // // 3. Zoom JWT Payload
    // const oHeader = { alg: "HS256", typ: "JWT" };
    // const oPayload = {
    //   appKey: sdkKey,
    //   // sdkKey: sdkKey,
    //   mn: meetingNumber.toString(),
    //   role: parseInt(role),
    //   iat: iat,
    //   exp: exp,
    //   tokenExp: exp,
    // };

    // const toBase64 = (obj) => Buffer.from(JSON.stringify(obj))
    //   .toString("base64")
    //   .replace(/\+/g, '-')
    //   .replace(/\//g, '_')
    //   .replace(/=/g, '');

    // const sHeader = toBase64(oHeader)
    // const sPayload = toBase64(oPayload);

    // // 4. Signature Generation
    // const signature = crypto
    //   .createHmac("sha256", sdkSecret)
    //   .update(`${sHeader}.${sPayload}`)
    //   .digest("base64")
    //   .replace(/\+/g, '-')
    //   .replace(/\//g, '_')
    //   .replace(/=/g, '');

    // const finalJWT = `${sHeader}.${sPayload}.${signature}`;

    // console.log(`✅ Signature successfully generated for: ${userEmail}`);
    console.log("SDK_KEY:", sdkKey);
    console.log("sdkSecret:", sdkSecret);
    console.log("meetingNumber:", meetingNumber);
    console.log("role:", role);

    const finalJWT = generateSignature(sdkKey, sdkSecret, meetingNumber, role);

    // 5. Standard API Response (Status 200)
    return res.status(200).json({
      status: 200,
      success: true,
      message: "Signature generated successfully",
      data: {
        signature: finalJWT,
        role: role,
        sdkKey: sdkKey,
        userType: role === 1 ? "Admin/Host" : "Student/Participant",
      },
    });
  } catch (error) {
    console.error("Signature Error:", error);
    // Error Response (Status 500)
    return res.status(500).json({
      status: 500,
      success: false,
      message: "Internal Server Error: Signature generation failed",
      data: [],
    });
  }
});

function generateSignature(sdkKey, sdkSecret, meetingNumber, role) {
  // 1. Timestamps (Seconds mein hona chahiye, milliseconds mein nahi)
  const iat = Math.round(new Date().getTime() / 1000) - 30;
  const exp = iat + 60 * 60 * 2; // 2 ghante ke liye valid

  // 2. Header
  const oHeader = { alg: "HS256", typ: "JWT" };

  // 3. Payload (Zoom ki requirements ke hisaab se)
  const oPayload = {
    sdkKey: sdkKey,
    appKey: sdkKey,
    mn: meetingNumber,
    role: parseInt(role), // 1 for Host, 0 for Attendee
    iat: iat,
    exp: exp,
    tokenExp: exp,
  };

  // 4. Helper Function: Base64URL Encoding
  const toBase64 = (obj) => {
    return Buffer.from(JSON.stringify(obj))
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=/g, "");
  };

  const sHeader = toBase64(oHeader);
  const sPayload = toBase64(oPayload);

  // 5. Signature Generation using Crypto (HMAC SHA256)
  const signature = crypto
    .createHmac("sha256", sdkSecret)
    .update(sHeader + "." + sPayload)
    .digest("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");

  return `${sHeader}.${sPayload}.${signature}`;
}

module.exports = router;
