const supertest = require("supertest")
const { app } = require("./index")

const api = supertest(app)

test("facts are returned as json", async () => {
  await api
    .get("/api/facts")
    .expect(200)
    .expect("Content-Type", /application\/json/)
})

test("five facts are returned", async () => {
  const result = await api.get("/api/facts")
  expect(result.body.length).toBe(5)
})

test("find fact by id", async () => {
  const result = await api.get("/api/facts/5cd42b77cfdf230015bd7a45")
  expect(result.body.text).toBe("Cats can sense distress from a human being.")
})

test("fact with bad id returns error", async () => {
  const result = await api.get("/api/facts/noFactWithThisId").expect(404)
})
