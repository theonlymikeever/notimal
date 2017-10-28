const router = require('express').Router()
const request = require('request')


const appId = process.env.appId || null
const appKey = process.env.appKey || null

router.get('/', (req, res, next) => {
  const query = req.query.f
  const url = `https://api.edamam.com/search?q=${ query }&app_id=${ appId }&app_key=${ appKey }&from=0&to=3&calories=gte%20591,%20lte%20722&health=alcohol-free`

  request(url, function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  res.send(body);
});
  // .then(recipe => res.send(recipe.toString()))
  // .catch(err => console.log(err))
})


module.exports = router
