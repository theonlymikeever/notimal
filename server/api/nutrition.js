const router = require('express').Router()
const rquest = require('request-promise-native')

const appId_N = process.env.appId_N || null
const appKey_N = process.env.appKey_N || null

router.get('/', (req, res, next) => {
  const query = req.query
  const url = ``

  request(uri)
    .then(process => res.sendP(process))
    .catch(console.log)
})

module.exports = router
