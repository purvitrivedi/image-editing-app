import React from 'react'

class App extends React.Component {

  async componentDidMount() {
    try {
      const res = await fetch('/api/images')
      const json = await res.json()
      console.log(json)
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <h1>Hello World</h1>
    )
  }
}

export default App