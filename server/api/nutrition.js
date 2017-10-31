const router = require('express').Router()
const request = require('request-promise-native')
const chalk = require('chalk')
const GoogleImages = require('google-images');
const client = new GoogleImages(process.env.GOOGLE_CSE_ID, process.env.GOOGLE_CSE_KEY);

/* Keys ========================================= */
const appId = process.env.appId_N || null
const appKey = process.env.appKey_N || null

/* Routes ======================================= */
router.get('/images', (req, res, next) =>{
  console.log(chalk.green('searching images of ', req.query.i))
  client.search(req.query.i)
      .then(images => {
        res.send(images)
      })
      .catch(err => console.log(err))
})

router.get('/', (req, res, next) => {
  const query = encodeURI(req.query.ingr)
  console.log(chalk.green('Querying API for item: ', query))
  //Food Parser uri - returns all possible results
  const uri = `https://api.edamam.com/api/food-database/parser?ingr=${query}&app_id=${appId}&app_key=${appKey}&page=0`
  //Route has been re-written to do a post request for all items returned by initial query
  //this is done via a promise.all and thus all items are sent back with their nutrition info
  request({ uri, json: true })
    .then(results => {
      results.hints = results.hints.slice(0, 10) //limit our results
      let block = results.hints.map(food => {
          let body = {
            yield: 1,
            ingredients: [
              {
                quantity: 1,
                measureURI: food.measures[0].uri,
                foodURI: food.food.uri
              }
            ]
          }
          let options = {
            method: 'POST',
            uri: `https://api.edamam.com/api/food-database/nutrients?app_id=${appId}&app_key=${appKey}`,
            body,
            json: true
          }
          return request(options)
      })

      return Promise.all(block)
    })
    .then(fullResults => {
      // console.log('searching image for ', query)
      // client.search(query)
      //   .then(images => {
      //     nutrients.image = images[1].url
      //     res.send(nutrients)
      //   })
      res.send(fullResults)
    })
    .catch( err => console.log(err.error))
})

//Post route will be depreciated once we pass single item along in store
router.post('/', (req, res, next) => {
  const foodURI = req.body.foodURI
  const measureURI = req.body.measureURI
  console.log(chalk.green('Querying API for more item details: ', req.body))
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
      //Image addition via Google Custom Search API
      console.log('searching image for ', nutrients.ingredients[0].parsed[0].food)
      client.search(nutrients.ingredients[0].parsed[0].food)
        .then(images => {
          nutrients.image = images[1].url
          res.send(nutrients)
        })
    })
    .catch( err => console.log(err.error))
})



module.exports = router
