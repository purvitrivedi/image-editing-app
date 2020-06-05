import React from 'react'
import axios from 'axios'
class App extends React.Component {

  state = {
    img: null
  }
  async componentDidMount() {
    try {
      const url = 'https://res.cloudinary.com/jompra/image/upload/v1590683044/IMG_0317_lkmsjn.jpg'
      const res = await axios.post('/api/images/', { url })
      this.setState({ img: res.data.image })
      
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    console.log('render',this.state.img)
    return (
      <>
        <h1>Hello World</h1>
        <img src={this.state.img} alt='test' />
      </>
    )
  }
}

export default App