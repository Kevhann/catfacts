const { mockData } = require("./mockData")
const { getRandomItems } = require("./util")

test("random array returns one", async () => {
  const res = getRandomItems(mockData, 1)
  expect(res.length).toBe(1)
})

test("random array returns at most specified amount", async () => {
  const res = getRandomItems(mockData, 4)
  expect(res.length).toBeLessThanOrEqual(4)
})
