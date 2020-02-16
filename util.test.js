const { mockData } = require("./mockData")
const { getRandomItems } = require("./util")

test("randomArrayReturnsOne", async () => {
  const res = getRandomItems(mockData, 1)
  expect(res.length).toBe(1)
})
