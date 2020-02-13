const express = require("express")
const fetch = require("node-fetch")
const cors = require("cors")

const app = express()
app.use(cors())

app.use(express.static("build"))

const getRandomItems = (list, n) => {
  let indexes = {}
  let randomFacts = []
  const factsLength = list.length
  for (let index = 0; index < n * 2; index++) {
    const rand = Math.floor(Math.random() * factsLength)
    if (indexes[rand] === undefined) {
      indexes[rand] = true
      randomFacts.push(list[rand])
    }
    if (randomFacts.length === n) {
      break
    }
  }
  return randomFacts
}

app.get("/facts", async (req, res) => {
  const result = await fetch("https://cat-fact.herokuapp.com/facts")
  const resultJson = await result.json()
  const randoms = getRandomItems(resultJson.all, 5)
  res.send(randoms)
})

const PORT = 3001
app.listen(PORT, () => console.log(`listening on ${PORT}`))
