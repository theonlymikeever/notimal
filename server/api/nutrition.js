const router = require('express').Router()
const request = require('request-promise-native')

const appId = process.env.appId_N || null
const appKey = process.env.appKey_N || null

router.get('/', (req, res, next) => {
  const query = encodeURI(req.query.ingr)
  console.log('query: ', query)
  //Food Parser uri
  const uri = `https://api.edamam.com/api/food-database/parser?ingr=${query}&app_id=${appId}&app_key=${appKey}&page=0`

  request({ uri, json: true })
    .then(results => {
      res.send(results.hints)
      // const measureUri =
      // const body = {
      //   yield: 1,
      //   ingredients: [
      //     {
      //       quantity: 1,
      //       measureURI: results.parsed[0].food.measure.uri,
      //       foodURI: results.parsed[0].food.uri
      //     }
      //   ]
      // }
      // const options = {
      //   method: 'POST',
      //   uri: uri2,
      //   body: body,
      //   json: true
      // }
      // return request(options)
    })
    // .then(nutrients => {
    //   res.send(nutrients)
    // })
    .catch( err => console.log(err.error))
})

router.post('/', (req, res, next) => {
  const foodURI = req.body.foodURI
  const measureURI = req.body.measureURI
  console.log('looking up: ', req.body)
  //Nutrient uri (based on the result of parser)
  const uri = `https://api.edamam.com/api/food-database/nutrients?app_id=${appId}&app_key=${appKey}`
  const body = {
    yield: 1,
    ingredients: [
      {
        quantity: 1,
        measureURI,
        foodURI
      }
    ]
  }
  const options = {
    method: 'POST',
    uri,
    body,
    json: true
  }
   request(options)
    .then(nutrients => {
      res.send(nutrients)
    })
    .catch( err => console.log(err.error))
})


module.exports = router


// https://api.edamam.com/api/food-database/nutrients?app_id=5dccb5c0&app_key=0755064e49150249c65cebc3566a2255
