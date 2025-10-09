const nodemailer = require("nodemailer");
const { ObjectId } = require("mongodb");
const { getDB } = require("../../config/db");

// ✅ Send Blood Request Controller
const sendRequest = async (req, res) => {
  try {
    const db = getDB();
    const { donorId, message ,distance } = req.body;

    // Extract logged-in user (from verifyToken middleware)
   const sender = req.user;
   const senderdetails= await db.collection("users").findOne({ _id: new ObjectId(sender.id) },{ projection: { fullName: 1, email: 1,isVerified: 1, age:1,city:1} });
    // Find donor by ID
    const donor = await db.collection("users").findOne({ _id: new ObjectId(donorId) });
    if (!donor) {
      return res.status(404).json({ message: "Donor not found" });
    }

    // Create request object
    const requestObj = {
      senderId: new ObjectId(sender.id),
      senderName: senderdetails.fullName,
      senderEmail: senderdetails.email,
      message: message || "No message provided.",
      status: "pending",
      createdAt: new Date(),
    };

    // Push request into donor’s document
    await db.collection("users").updateOne(
      { _id: new ObjectId(donorId) },
      { $push: { requests: requestObj } }
    );

    // Nodemailer setup
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email buttons (Accept / Reject)
    const acceptUrl = `http://localhost:5173/request-response/${donorId}/accept`;
    const rejectUrl = `http://localhost:5173/request-response/${donorId}/reject`;

    // Email template
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: donor.email,
      subject: "🚨 New Blood Request Received",
      html: `
        <h2>Blood Request Notification</h2>
        <p>Hello <b>${donor.fullName}</b>,</p>
        <p>You’ve received a new blood request from <b>${senderdetails.fullName}</b> (${senderdetails.email}).</p>
        <p><b>Message:</b> ${message || "No message provided."}</p>
        <p><b>receiver is verified:</b> ${sender.isVerified ? "✅ Yes" : "❌ No"} and it is ${distance} km away from you</p>
        <p>Please respond by clicking one of the buttons below:</p>
        <p>
          <a href="${acceptUrl}" style="background:#16a34a;color:#fff;padding:10px 20px;border-radius:5px;text-decoration:none;">Accept</a>
          &nbsp;
          <a href="${rejectUrl}" style="background:#dc2626;color:#fff;padding:10px 20px;border-radius:5px;text-decoration:none;">Reject</a>
        </p>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "✅ Request sent successfully and email delivered." });
  } catch (err) {
    console.error("❌ Error sending request:", err);
    res.status(500).json({ message: "Failed to send request", error: err.message });
  }
};

// ✅ Export the controller
module.exports = { sendRequest };
