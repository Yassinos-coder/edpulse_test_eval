const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8009;

app.use(cors());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON bodies
app.use(express.json());

const pabblyWebhookUrl = 'https://connect.pabbly.com/workflow/sendwebhookdata/IjU3NjYwNTY5MDYzMTA0M2Q1MjY1NTUzZDUxMzYi_pc'
const pabblyWebhookUrl2 = 'https://connect.pabbly.com/workflow/sendwebhookdata/IjU3NjYwNTY5MDYzZTA0MzQ1MjZlNTUzNDUxMzAi_pc'


// Route to trigger the Pabbly webhook
app.post('/trigger-pabbly', async (req, res) => {
    console.log(req.body); // This should now log the parsed form data
    // data being sent to pabbly
    const dataToSend = {

        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phonenumber: req.body.phonenumber,
        adresse: req.body.adresse,
    };

    try {
        // Make a POST request to the Pabbly webhook URL
        const response = await axios.post(pabblyWebhookUrl, dataToSend);

        // Respond to the frontend with success
        res.status(200).json({ message: 'Webhook triggered successfully', response: response.data });
    } catch (error) {
        // Handle errors
        console.error('Error triggering webhook:', error);
        res.status(500).json({ message: 'Failed to trigger webhook', error: error.message });
    }
});

// Route to trigger the Pabbly webhook
app.post('/SaveUncompletedFormData', async (req, res) => {
    console.log(req.body); // This should now log the parsed form data
    // data being sent to pabbly
    const dataToSend = {

        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phonenumber: req.body.phonenumber,
        adresse: req.body.adresse,
        uncomplete: 'uncomplete'
    };

    try {
        // Make a POST request to the Pabbly webhook URL
        const response = await axios.post(pabblyWebhookUrl2, dataToSend);

        // Respond to the frontend with success
        res.status(200).json({ message: 'Webhook triggered successfully', response: response.data });
    } catch (error) {
        // Handle errors
        console.error('Error triggering webhook:', error);
        res.status(500).json({ message: 'Failed to trigger webhook', error: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
