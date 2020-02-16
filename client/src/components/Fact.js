import React, { useEffect, useState } from "react"
import { Button, Segment, Divider, Loader } from "semantic-ui-react"
import axios from "axios"
import { useStore } from "react-hookstore"
import { useHistory } from "react-router-dom"

const Fact = ({ id }) => {
  const [facts] = useStore("factStore")
  const [fact, setFact] = useState()

  const [loadError, setLoadError] = useState(false)
  const [loading, setLoading] = useState(true)

  const history = useHistory()

  useEffect(() => {
    find()
  }, [])

  const find = async () => {
    const found = facts.find(f => f._id === id)

    if (found !== undefined) {
      setFact(found)
    } else {
      await fetchFact()
    }
    setLoading(false)
  }

  const fetchFact = async () => {
    try {
      const result = await axios.get(`/api/facts/${id}`, {
        timeout: 10000
      })
      setFact(result.data)
    } catch (error) {
      setLoadError(true)
    }
  }

  if (loadError) {
    return <h3>Error retrieving cat fact</h3>
  }

  if (loading) {
    return <Loader active>Loading your spicy cat fact</Loader>
  }

  return (
    <div>
      <Segment>
        <Divider></Divider>

        <div>Text: {fact.text}</div>
        <Divider></Divider>
        <div>Type: {fact.type}</div>
        <Divider></Divider>

        <div>Upvotes: {fact.upvotes}</div>
        <Divider></Divider>

        <div>
          Added By: {fact.user.name.first} {fact.user.name.last}
        </div>
        <Divider></Divider>
      </Segment>
      <Button onClick={() => history.push("/")}>Back</Button>
    </div>
  )
}

export default Fact
