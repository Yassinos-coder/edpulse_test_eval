const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 80;

app.use(cors());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON bodies
app.use(express.json());

const pabblyWebhookUrl = 'https://connect.pabbly.com/workflow/sendwebhookdata/IjU3NjYwNTY5MDYzMTA0M2Q1MjY1NTUzZDUxMzYi_pc';
const pabblyWebhookUrl2 = 'https://connect.pabbly.com/workflow/sendwebhookdata/IjU3NjYwNTY5MDYzZTA0MzQ1MjZlNTUzNDUxMzAi_pc';

// Root route - Displays a simple HTML message
app.get('/', (req, res) => {
  res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            .red-bold {
              color: red;
              font-weight: bold;
            }
          </style>
        </head>
        <body>
          <p class="red-bold">Get out of here</p>
        </body>
      </html>
    `);
});

// Route to trigger the first Pabbly webhook
app.post('/trigger-pabbly', async (req, res) => {
  console.log(req.body); // Logs incoming form data

  const dataToSend = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    phonenumber: req.body.phonenumber,
  };

  try {
    // Sends form data to Pabbly webhook
    const response = await axios.post(pabblyWebhookUrl, dataToSend);

    // Responds to the client with success message
    res.status(200).json({ message: 'Webhook triggered successfully', response: response.data });
  } catch (error) {
    console.error('Error triggering webhook:', error);
    res.status(500).json({ message: 'Failed to trigger webhook', error: error.message });
  }
});

// Route to save incomplete form data to Pabbly webhook
app.post('/SaveUncompletedFormData', async (req, res) => {
  console.log(req.body); // Logs incoming incomplete form data

  const dataToSend = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    phonenumber: req.body.phonenumber,
    uncomplete: 'uncomplete', // Marks the data as incomplete
  };

  try {
    // Sends incomplete form data to Pabbly webhook
    const response = await axios.post(pabblyWebhookUrl2, dataToSend);

    // Responds to the client with success message
    res.status(200).json({ message: 'Webhook triggered successfully', response: response.data });
  } catch (error) {
    console.error('Error triggering webhook:', error);
    res.status(500).json({ message: 'Failed to trigger webhook', error: error.message });
  }
});

// Starts the server on the defined port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
