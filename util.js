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

module.exports = { getRandomItems }
