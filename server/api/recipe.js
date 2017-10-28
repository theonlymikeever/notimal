const router = require('express').Router()
const request = require('request-promise-native')

const appId = process.env.appId_R || null
const appKey = process.env.appKey_R || null

router.get('/', (req, res, next) => {
  const query = req.query.f
  //vegan only search:
  // const uri = `https://api.edamam.com/search?q=${ query }&app_id=${ appId }&app_key=${ appKey }&health=vegan`
  const uri = `https://api.edamam.com/search?q=${ query }&app_id=${ appId }&app_key=${ appKey }`

  request(uri)
    .then(process => res.send(process))
    .catch(err => console.log(err.error))

//Below uses request without promises, which has beemn changed
// *********************************************************
//   request(url, function (error, response, body) {
//   console.log('error:', error); // Print the error if one occurred
//   res.send(body);
// });
})


module.exports = router
