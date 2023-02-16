// Flexible Compound Components
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'
import {Switch} from '../switch'

const ToggleContext = React.createContext()
ToggleContext.displayName = 'ToggleContext'

function Toggle({children}) {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)

  const value = [on, toggle]

  return (
    <ToggleContext.Provider value={value}>{children}</ToggleContext.Provider>
  )
}

function useContext(name, Context) {
  const context = React.useContext(ToggleContext)
  if (!context) {
    throw new Error(`${name} must be used within it's provider`)
  }
  return context
}

function useToggleConsumer() {
  return useContext('useToggleConsumer', ToggleContext)
}

function ToggleOn({children}) {
  const [on] = useToggleConsumer()
  return on ? children : null
}

function ToggleOff({children}) {
  const [on] = useToggleConsumer()
  return on ? null : children
}

function ToggleButton(props) {
  const [on, toggle] = useToggleConsumer()
  return <Switch on={on} onClick={toggle} {...props} />
}

function App() {
  return (
    <div>
      <Toggle>
        <ToggleOn>The button is on</ToggleOn>
        <ToggleOff>The button is off</ToggleOff>
        <div>
          <ToggleButton />
        </div>
      </Toggle>
    </div>
  )
}

export default App

/*
eslint
  no-unused-vars: "off",
*/
