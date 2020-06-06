import React from 'react'

const initialState = {
  data: null,
  error: null,
  loading: true
}

function useFetch(request, params = null) {
  const [state, setState] = React.useState(initialState)

  React.useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await request(params)
        setState({ data, loading: false, error: null })
      } catch (err) {
        setState({ error: true , loading: false, data: null })
      }
    }
    getData()
  }, [request, params])

  return state
}

export default useFetch