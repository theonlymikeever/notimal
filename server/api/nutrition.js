const router = require('express').Router()
const request = require('request-promise-native')

const appId = process.env.appId_N || null
const appKey = process.env.appKey_N || null

router.get('/', (req, res, next) => {
  const query = req.query
  const uri = `https://api.edamam.com/api/food-database/parser?ingr=red%20apple&app_id=${appId}&app_key=${appKey}&page=0`

  const uri2 = `https://api.edamam.com/api/food-database/nutrients?app_id=${appId}&app_key=${appKey}`

console.log('first quest...')
  request({ uri, json: true })
    .then(results => {
      console.log('uri ', results.parsed)
      const body = {
        "yield": 1,
        "ingredients": [
          {
            "quantity": 1,
            "measureURI": 'http://www.edamam.com/ontologies/edamam.owl#Measure_serving',
            "foodURI": results.parsed[0].food.uri
          }
        ]
      }
      const options = {
        method: 'POST',
        uri: uri2,
        body: body,
        json: true // Automatically stringifies the body to JSON
      }
      console.log(results.parsed)
      return request(options)
    })
    .then(process => {
      console.log(process)
      res.send(process)
    })
    .catch( err => console.log(err.error))
})

module.exports = router


// https://api.edamam.com/api/food-database/nutrients?app_id=5dccb5c0&app_key=0755064e49150249c65cebc3566a2255
