const axios = require('axios');
require('dotenv').config();

//Getting images
const fetchImages = async (req, res, sortBy) => {
  const { category = 'default', page = 1 } = req.query;
  const apiKey = process.env.PIXA_API_KEY;
  let url = `https://pixabay.com/api/?key=${apiKey}&q=${category}&page=${page}&per_page=100`;
  try {
    const response = await axios.get(url);
    res.json(response.data.hits);
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).send('Error fetching images');
  }
};

module.exports = {
  fetchImages
};
