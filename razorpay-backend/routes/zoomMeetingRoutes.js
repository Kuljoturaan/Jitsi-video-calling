const express = require("express");
const router = express.Router();
const KJUR = require("jsrsasign");
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
    const iat = Math.round(new Date().getTime() / 1000) - 30;
    const exp = iat + 60 * 60 * 2;

    // 3. Zoom JWT Payload
    const oHeader = { alg: "HS256", typ: "JWT" };
    const oPayload = {
      sdkKey: sdkKey,
      mn: meetingNumber,
      role: role,
      iat: iat,
      exp: exp,
      appKey: sdkKey,
      tokenExp: iat + 60 * 60 * 2,
    };

    const sHeader = JSON.stringify(oHeader);
    const sPayload = JSON.stringify(oPayload);

    // 4. Signature Generation
    const signature = KJUR.jws.JWS.sign("HS256", sHeader, sPayload, sdkSecret);

    console.log(
      `User ${userEmail} joined as ${role === 1 ? "Host" : "Participant"}`,
    );

    // 5. Standard API Response (Status 200)
    return res.status(200).json({
      status: 200,
      success: true,
      message: "Signature generated successfully",
      data: [
        {
          signature: signature,
          role: role,
          sdkKey: sdkKey,
          userType: role === 1 ? "Admin/Host" : "Student/Participant",
        },
      ],
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

module.exports = router;