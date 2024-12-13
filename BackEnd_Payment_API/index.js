const functions = require("firebase-functions");
const express = require("express");
const bodyParser = require("body-parser");
const midtransClient = require("midtrans-client");
const cors = require("cors");

const app = express();

app.use(cors({
  origin: "https://kidcare-info.web.app",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const MIDTRANS_SERVER_KEY =
  "SB-Mid-server-eDkWE8kJx9tAF_tIf-CuMK8d";
const MIDTRANS_CLIENT_KEY =
  "SB-Mid-client-bKs9hY7uAp9mKb-h";

const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: MIDTRANS_SERVER_KEY,
  clientKey: MIDTRANS_CLIENT_KEY,
});

app.post("/generate-snap-token", async (req, res) => {
  const {
    order_id: orderId,
    gross_amount: grossAmount,
    item_details: itemDetails,
    customer_details: customerDetails,
  } = req.body;

  if (!orderId || !grossAmount || !itemDetails || !customerDetails) {
    return res.status(400).json({
      message: "Required fields are incomplete",
    });
  }

  const parameter = {
    transaction_details: {
      order_id: orderId,
      gross_amount: grossAmount,
    },
    item_details: itemDetails,
    customer_details: customerDetails,
  };

  try {
    const transaction = await snap.createTransaction(parameter);
    const snapToken = transaction.token;
    const snapUrl = transaction.redirect_url;

    res.json({
      snapToken: snapToken,
      snapUrl: snapUrl,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to generate Snap Token",
      error: error.message,
    });
  }
});

// New Midtrans Notification Endpoint
app.post("/midtrans-notification", async (req, res) => {
  try {
    const coreApi = new midtransClient.CoreApi({
      isProduction: false,
      serverKey: MIDTRANS_SERVER_KEY,
      clientKey: MIDTRANS_CLIENT_KEY,
    });

    const notificationJson = req.body;

    const statusResponse = await coreApi.transaction.notification(
        notificationJson,
    );

    const orderId = statusResponse.order_id;
    const transactionStatus = statusResponse.transaction_status;
    const fraudStatus = statusResponse.fraud_status;

    // Handle the transaction status
    if (transactionStatus === "capture") {
      if (fraudStatus === "challenge") {
        // TODO: Mark transaction as challenged
        console.log(`Transaction ${orderId} is challenged.`);
      } else if (fraudStatus === "accept") {
        // TODO: Mark transaction as successful
        console.log(`Transaction ${orderId} is successful.`);
      }
    } else if (transactionStatus === "settlement") {
      // TODO: Mark transaction as settled
      console.log(`Transaction ${orderId} is settled.`);
    } else if (transactionStatus === "deny") {
      // TODO: Mark transaction as denied
      console.log(`Transaction ${orderId} is denied.`);
    } else if (
      transactionStatus === "cancel" ||
      transactionStatus === "expire"
    ) {
      // TODO: Mark transaction as canceled or expired
      console.log(`Transaction ${orderId} is canceled or expired.`);
    } else if (transactionStatus === "pending") {
      // TODO: Mark transaction as pending
      console.log(`Transaction ${orderId} is pending.`);
    }

    // Include payment status in the response
    res.status(200).json({
      message: "Notification received",
      transactionStatus: transactionStatus,
      fraudStatus: fraudStatus,
      orderId: orderId,
    });
  } catch (error) {
    console.error("Error handling Midtrans notification:", error);
    res.status(500).json({message: "Internal Server Error"});
  }
});

app.get("/get-transaction-status/:orderId", async (req, res) => {
  const orderId = req.params.orderId;
  const transactionId = req.query.transaction_id;

  if (!orderId && !transactionId) {
    return res.status(400).json({
      message: "orderId atau transaction_id diperlukan",
    });
  }

  try {
    const coreApi = new midtransClient.CoreApi({
      isProduction: false,
      serverKey: MIDTRANS_SERVER_KEY,
      clientKey: MIDTRANS_CLIENT_KEY,
    });

    let statusResponse;
    if (orderId) {
      statusResponse = await coreApi.transaction.status(orderId);
    } else {
      statusResponse = await coreApi.transaction.status(transactionId);
    }

    res.json(statusResponse);
  } catch (error) {
    console.error("Error fetching transaction status:", error);
    res.status(500).json({
      message: "Gagal mendapatkan status transaksi",
      error: error.message,
    });
  }
});

exports.api = functions.https.onRequest(app);
