const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { initializeApp } = require("firebase-admin/app");
const { getFirestore, Timestamp } = require("firebase-admin/firestore");
const { defineSecret } = require("firebase-functions/params");
const nodemailer = require("nodemailer");

// Initialize Firebase
initializeApp();

// Configure secrets (set these using: firebase functions:config:set)
const gmailEmail = defineSecret("GMAIL_EMAIL");
const gmailPassword = defineSecret("GMAIL_PASSWORD");

exports.sendReminderEmail = onDocumentCreated(
  {
    document: "reminders/{reminderId}",
    region: "us-central1",
    secrets: [gmailEmail, gmailPassword], // Secure credentials
    memory: "512MB",
    timeoutSeconds: 60,
    retry: false,
  },
  async (event) => {
    const snapshot = event.data;
    if (!snapshot.exists) {
      console.log("No data associated with the event");
      return;
    }

    const reminder = snapshot.data();
    const mailOptions = {
      from: `Medicine Reminder <${gmailEmail.value()}>`,
      to: reminder.userEmail,
      subject: `⏰ Time to take ${reminder.medicineName}!`,
      html: `
        <h2>Hello!</h2>
        <p>It's time to take your <strong>${reminder.medicineName}</strong>.</p>
        <p>Scheduled time: ${reminder.time.toDate().toLocaleTimeString()}</p>
        <p>Thank you for using our service!</p>
      `,
    };

    // Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailEmail.value(),
        pass: gmailPassword.value(),
      },
    });

    try {
      await transporter.sendMail(mailOptions);
      console.log(`✅ Email sent to: ${reminder.userEmail}`);
      
      // Optional: Mark as sent in Firestore
      const db = getFirestore();
      await db.doc(`reminders/${event.params.reminderId}`).update({
        status: "sent",
        sentAt: Timestamp.now(),
      });
      
    } catch (error) {
      console.error("❌ Failed to send email:", error);
      
      // Optional: Mark as failed in Firestore
      const db = getFirestore();
      await db.doc(`reminders/${event.params.reminderId}`).update({
        status: "failed",
        error: error.message,
      });
      
      throw new Error("Failed to send reminder email");
    }
  }
);