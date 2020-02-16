const express = require("express")
const fetch = require("node-fetch")
const cors = require("cors")
const path = require("path")
const { getRandomItems } = require("./util")

const app = express()

app.use(cors())

app.use(express.static("build"))

app.get("/api/facts", async (req, res) => {
  const result = await fetch("https://cat-fact.herokuapp.com/facts")
  const resultJson = await result.json()
  const randoms = getRandomItems(resultJson.all, 5)
  res.send(randoms)
})

app.get("/api/facts/:id", async (req, res) => {
  console.log("hello", req.params.id)

  const result = await fetch("https://cat-fact.herokuapp.com/facts")
  const resultJson = await result.json()

  const found = resultJson.all.find(fact => fact._id === req.params.id)
  console.log("found:", found)
  if (found === undefined) {
    res.status(404)
  }
  res.send(found)
})

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "/build/index.html"), err => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

const PORT = 3001
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => console.log(`listening on ${PORT}`))
}
