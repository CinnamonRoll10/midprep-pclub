const express = require('express');
const bodyParser = require('body-parser');
const workerRoutes = require('./routes/workerRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

app.use(bodyParser.json());

// Routes
app.use('/api/workers', workerRoutes);
app.use('/api/tasks', taskRoutes);

// Health Check Route
app.get('/health', (req, res) => {
    res.status(200).send("API is running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
