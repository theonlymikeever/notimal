const router = require('express').Router()
const request = require('request-promise-native')


const appId = process.env.appId || null
const appKey = process.env.appKey || null

router.get('/', (req, res, next) => {
  const query = req.query.f
  const uri = `https://api.edamam.com/search?q=${ query }&app_id=${ appId }&app_key=${ appKey }&from=0&to=3&calories=gte%20591,%20lte%20722&health=alcohol-free`

request(uri)
  .then(process => res.send(process))
  .catch(console.log)

//Below uses request without promises, which has beemn changed
// *********************************************************
//   request(url, function (error, response, body) {
//   console.log('error:', error); // Print the error if one occurred
//   res.send(body);
// });
})


module.exports = router
