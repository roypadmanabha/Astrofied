# Google Apps Script Setup Guide

Follow these instructions to connect your **Astrofied Gemstones** web form to a Google Sheet using Google Apps Script:

## 1. Prepare Google Sheet
1. Open the target Google Sheet in your browser:
   `https://docs.google.com/spreadsheets/d/1lunT9lyME8g3It8h-Z0tqWoVuq8lcX-GP9E9Sc8KJBg/edit`
2. Make sure you are logged into the Google Account that owns or has edit access to this sheet.

## 2. Open Apps Script Editor
1. In the Google Sheets top menu, click **Extensions** → **Apps Script**.
2. This opens the Apps Script code editor in a new tab.

## 3. Add Script Code
1. Delete any default code in the editor (usually an empty `myFunction` block).
2. Copy and paste the following script into the editor:

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = e.parameter;

  // Write header row once if sheet is empty
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Timestamp', 'Payment Type', 'Name', 'Mobile', 'Address', 'Total Amount', 'Advance Payment Amount', 'Pending Payment Amount', 'Consent']);
  }

  sheet.appendRow([
    data.timestamp || new Date().toISOString(),
    data.paymentType,
    data.name,
    data.mobile,
    data.address,
    data.totalAmount || '0',
    data.advanceAmount || '0',
    data.pendingAmount || '0',
    data.consent,
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ status: 'success' }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

3. Save the project by clicking the **Save** (disk) icon in the top toolbar or using `Cmd + S` / `Ctrl + S`.

## 4. Deploy as Web App
1. Click the **Deploy** button in the top right, and select **New deployment**.
2. In the deployment configuration popup, click the **Gear icon (Select type)** and choose **Web app**.
3. Configure the settings exactly as follows:
   * **Description**: `Astrofied Gemstones Lead Capture`
   * **Execute as**: **Me (your-email@gmail.com)**
   * **Who has access**: **Anyone**
4. Click **Deploy**.
5. Google will prompt you to **Authorize Access**. Click **Authorize Access** and select your account.
6. Under the warning screen, click **Advanced** → **Go to Astrofied Gemstones (unsafe)** (this is standard for unverified personal Apps Scripts) and click **Allow**.
7. Once the deployment finishes, copy the **Web app URL** provided in the popup (the URL ends with `/exec`).

## 5. Configure Environmental Variables
1. Create a `.env` file in the root of your `gemstones` project directory.
2. Add the copied URL to it like this:
   ```env
   VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/XXXXXXXXXXXX/exec
   ```
3. Save the `.env` file.
4. Restart the Vite local development server (`npm run dev`) so Vite loads the new environment variables.
