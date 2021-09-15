import { useState, useEffect, useRef, useLayoutEffect } from 'react'

// to hold state data from a form
// takes an an object to initialize
// ----- usage -----
// const {values, handleChange} = useForm({useName: '', password: '', email: ''})
// <>
//  <input name="useName" value={values.useName} onChange={handleChange} />
//  <input name="password" value={values.password} onChange={handleChange} />
//  <input name="email" value={values.email} onChange={handleChange} />
// </>
//
export function useForm(initialValues) {
  const [values, setValues] = useState(initialValues)

  return {
    values,
    handleChange: (e) => {
      setValues({
        ...values,
        [e.target.name]: e.target.value,
      })
    },
  }
}

export function useFetch(url, type = 'json') {
  const [state, setState] = useState({ data: null, loading: true })

  useEffect(() => {
    setState({ data: null, loading: true })
    if (type === 'json') {
      fetch(url)
        .then((res) => res.json())
        .then((data) => setState({ data: data, loading: false }))
    } else if (type === 'text') {
      fetch(url)
        .then((res) => res.text())
        .then((data) => setState({ data: data, loading: false }))
    }
  }, [url, type, setState])

  return state
}

export function useMeasure(depend) {
  const [rect, setRect] = useState({})
  const myRef = useRef()
  useLayoutEffect(() => {
    setRect(myRef.current.getBoundingClientRect())
  }, depend)
  return [rect, myRef]
}
