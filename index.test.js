const { mockData } = require("./mockData")
const { getRandomItems } = require("./index")
const app = require("./index")

test("randomArrayReturnsOne", async () => {
  const res = getRandomItems(mockData, 1)
  expect(res.length).toBe(1)
  await app.close()
})
