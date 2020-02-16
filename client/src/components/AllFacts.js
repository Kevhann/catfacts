import React, { useEffect, useState } from "react"
import { List, Button, Segment, Loader } from "semantic-ui-react"
import { Link } from "react-router-dom"
import { useStore } from "react-hookstore"
import axios from "axios"

const AllFacts = () => {
  const [facts, setFacts] = useStore("factStore")
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState(false)

  const find = async () => {
    if (facts.length === 0) {
      await fetchFacts()
    }
    setLoading(false)
  }

  const fetchFacts = async () => {
    setLoading(true)

    try {
      const result = await axios.get("/api/facts", {
        timeout: 10000
      })
      setFacts(result.data)
    } catch (error) {
      setLoadError(true)
    }
    setLoading(false)
  }

  useEffect(() => {
    find()
  }, [])

  if (loadError) {
    return <h3>Error retrieving cat facts</h3>
  }

  if (loading) {
    return <Loader active>Loading your spicy cat facts</Loader>
  }

  return (
    <>
      <Segment>
        <List relaxed="very">
          {facts.map(fact => (
            <List.Item key={fact.text}>
              <List.Content>{fact.text}</List.Content>
              <List.Header as={Link} to={`facts/${fact._id}`}>
                Link
              </List.Header>
            </List.Item>
          ))}
        </List>
      </Segment>
      <Button primary onClick={() => fetchFacts()}>
        New Facts!
      </Button>
    </>
  )
}

export default AllFacts
