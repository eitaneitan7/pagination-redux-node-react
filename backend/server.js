const express = require('express');
const imageRoutes = require('./routes/ImageRoutes');

// Initialize Express app
const app = express();
const port = process.env.PORT || 4000;

// Use image routes
app.use('/api', imageRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
