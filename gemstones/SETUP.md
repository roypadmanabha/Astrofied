# Google Apps Script Setup Guide (Online Payment Mode)

Follow these step-by-step instructions to connect **Astrofied Gemstones Online Mode** to your new Google Sheet:

## Target Google Sheet
**Sheet Name**: `Astrofied Gemstones Customer Data Online Payment`  
**Sheet URL**: `https://docs.google.com/spreadsheets/d/1JHbZOdkT7EskWMCcn61JYGQ8wTL8yoZaqmaDsIBVJXY/edit`

---

## 1. Open Google Apps Script Editor
1. Open the Google Sheet above in your browser.
2. In the top menu bar, click **Extensions** → **Apps Script**.
3. This opens the Google Apps Script code editor in a new tab.

---

## 2. Replace Code in Editor
1. Delete all existing default code in `Code.gs`.
2. Copy and paste the following Google Apps Script code:

```javascript
// Google Apps Script for Astrofied Gemstones (EXCLUSIVELY ONLINE PAYMENT)

function doGet(e) {
  try {
    var params = e ? e.parameter : {};
    var ref = params.ref || params.transactionRef;
    var callback = params.callback;

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheets()[0];
    var data = sheet.getDataRange().getValues();

    var isPaid = false;
    var status = "PENDING";

    if (ref && data.length > 1) {
      // Search for transactionRef in column 2 (index 1: Transaction Ref)
      for (var i = 1; i < data.length; i++) {
        var rowRef = data[i][1] ? data[i][1].toString().trim() : "";
        if (rowRef === ref.trim()) {
          var currentStatus = data[i][2] ? data[i][2].toString().trim().toUpperCase() : "";
          if (currentStatus === "PAID" || currentStatus === "SUCCESS" || currentStatus === "COMPLETED" || currentStatus === "CONFIRMED") {
            isPaid = true;
            status = "SUCCESS";
          }
          break;
        }
      }
    }

    var resultPayload = {
      "status": status,
      "paid": isPaid,
      "ref": ref || ""
    };

    var jsonString = JSON.stringify(resultPayload);

    if (callback) {
      // JSONP Callback format for cross-origin browser polling
      return ContentService.createTextOutput(callback + "(" + jsonString + ")")
                           .setMimeType(ContentService.MimeType.JAVASCRIPT);
    } else {
      return ContentService.createTextOutput(jsonString)
                           .setMimeType(ContentService.MimeType.JSON);
    }
  } catch (err) {
    var errPayload = JSON.stringify({ "status": "ERROR", "paid": false, "message": err.toString() });
    if (e && e.parameter && e.parameter.callback) {
      return ContentService.createTextOutput(e.parameter.callback + "(" + errPayload + ")")
                           .setMimeType(ContentService.MimeType.JAVASCRIPT);
    }
    return ContentService.createTextOutput(errPayload)
                         .setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheets()[0];

    // Auto-create & format header row on first submission if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp',
        'Transaction Ref',
        'Payment Status',
        'Payment Type',
        'Customer Name',
        'First Name',
        'Last Name',
        'Mobile No.',
        'Full Address',
        'Street Address',
        'City',
        'District',
        'State',
        'Pincode',
        'Gemstone',
        'Size (mm)',
        'Total Amount (₹)',
        'Advance Amount (₹)',
        'Pending Amount (₹)',
        'Consent'
      ]);

      // Format header aesthetics
      var headerRange = sheet.getRange(1, 1, 1, 20);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#D10000");
      headerRange.setFontColor("#FFFFFF");
      sheet.setFrozenRows(1);
    }

    var data = e ? e.parameter : {};

    var timestamp = data.timestamp || new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    var transactionRef = data.transactionRef || "";
    var paymentStatus = data.paymentStatus || "pending";
    var paymentType = data.paymentType || "";
    var customerName = data.name || ((data.firstName || "") + " " + (data.lastName || "")).trim();
    var firstName = data.firstName || "";
    var lastName = data.lastName || "";
    var mobile = data.mobile || "";
    var fullAddress = data.address || "";
    var streetAddress = data.streetAddress || "";
    var city = data.city || "";
    var district = data.district || "";
    var state = data.state || "";
    var pincode = data.pincode || "";
    var gemstone = data.gemstone || "";
    var size = data.size || "";
    var totalAmount = data.totalAmount || "0";
    var advanceAmount = data.advanceAmount || "0";
    var pendingAmount = data.pendingAmount || "0";
    var consent = data.consent || "Yes";

    var rowData = [
      timestamp,
      transactionRef,
      paymentStatus,
      paymentType,
      customerName,
      firstName,
      lastName,
      mobile,
      fullAddress,
      streetAddress,
      city,
      district,
      state,
      pincode,
      gemstone,
      size,
      totalAmount,
      advanceAmount,
      pendingAmount,
      consent
    ];

    sheet.appendRow(rowData);

    return ContentService.createTextOutput(JSON.stringify({ "status": "success", "transactionRef": transactionRef }))
                         .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ "status": "error", "message": error.toString() }))
                         .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Save the project (`Cmd + S` or click the floppy disk icon).

---

## 3. Deploy as Web App
1. Click **Deploy** → **New deployment**.
2. Click the **Gear icon** (Select type) and choose **Web app**.
3. Fill in:
   - **Description**: `Astrofied Gemstones Online Lead Capture & Status Verification`
   - **Execute as**: `Me (your Google account)`
   - **Who has access**: `Anyone`
4. Click **Deploy**.
5. Grant access permissions when prompted:
   - Click **Authorize Access**.
   - Choose your Google account.
   - Click **Advanced** → **Go to Astrofied Gemstones (unsafe)** → Click **Allow**.
6. Copy the generated **Web App URL** (ends with `/exec`).

---

## 4. How to Test Real-Time Online Payment Status
- When a customer submits an online QR payment order, a new row is written with `Payment Status` set to `pending`.
- When the payment is received, change `Payment Status` in the sheet for that row to **`PAID`**.
- The customer's browser screen will instantly detect the status update and show the green success screen and receipt.

*(Note: Offline customer data is strictly isolated and will NEVER post to this or any Google Sheet).*

