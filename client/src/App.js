import { Container } from "semantic-ui-react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import AllFacts from "./components/AllFacts"
import Fact from "./components/Fact"
import { createStore } from "react-hookstore"
import React from "react"

createStore("factStore", [])

const App = () => {
  // Switch handles first match
  return (
    <Router>
      <Container style={{ paddingTop: 10 }}>
        <Switch>
          <Route
            exact
            path="/facts/:id"
            render={({ match }) => <Fact id={match.params.id} />}
          />
          <Route
            path="*"
            render={() => (
              <>
                <AllFacts />
              </>
            )}
          />
        </Switch>
      </Container>
    </Router>
  )
}

export default App
