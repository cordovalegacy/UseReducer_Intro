import { useReducer } from 'react'
import './App.css'

function App() {

  const initialFormState = {
    firstName: {
      value: "",
      error: ""
    },
    lastName: {
      value: "",
      error: ""
    },
    email: {
      value: "",
      error: ""
    }
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_FIRST_NAME":
        return {
          ...state,
          firstName: {
            ...state.firstName,
            value: action.payload
          }
        }
      case "SET_LAST_NAME":
        return {
          ...state,
          lastName: {
            ...state.lastName,
            value: action.payload
          }
        }
      case "SET_EMAIL":
        return {
          ...state,
          email: {
            ...state.email,
            value: action.payload
          }
        }
      case "SET_FIRST_NAME_ERROR":
        return {
          ...state,
          firstName: {
            ...state.firstName,
            error: action.payload
          }
        }
      case "SET_LAST_NAME_ERROR":
        return {
          ...state,
          lastName: {
            ...state.lastName,
            error: action.payload
          }
        }
      case "SET_EMAIL_ERROR":
        return {
          ...state,
          email: {
            ...state.email,
            error: action.payload
          }
        }
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(reducer, initialFormState)

  const changeHandler = (e) => {
    console.log(e)
    //if condition is true, it will run through TUNNEL ONE, if not, TUNNEL TWO
    if (e.target.value.length < 3) {
      // TUNNEL ONE
      if (e.target.name === "firstName") {
        dispatch({
          type: "SET_FIRST_NAME_ERROR",
          payload: "First Name Must Be At Least 3 Characters"
        })
      }
      else if (e.target.name === "lastName") {
        dispatch({
          type: "SET_LAST_NAME_ERROR",
          payload: "Last Name Must Be At Least 3 Characters"
        })
      }
      else if (e.target.name === "email") {
        dispatch({
          type: "SET_EMAIL_ERROR",
          payload: "Email Address Must Be Valid"
        })
      }
    }
    // TUNNEL TWO
    else {
      if (e.target.name === "firstName") {
        dispatch({
          type: "SET_FIRST_NAME",
          payload: e.target.value
        })
        dispatch({
          type: "SET_FIRST_NAME_ERROR",
          payload: ""
        })
      }
      if (e.target.name === "lastName") {
        dispatch({
          type: "SET_LAST_NAME",
          payload: e.target.value
        })
        dispatch({
          type: "SET_LAST_NAME_ERROR",
          payload: ""
        })
      }
      if (e.target.name === "email") {
        dispatch({
          type: "SET_EMAIL",
          payload: e.target.value
        })
        dispatch({
          type: "SET_EMAIL_ERROR",
          payload: ""
        })
      }
    }
  }
  // An action is JUST A JAVASCRIPT OBJECT {}, or set of key value pairs, with 2 distinct keys
  // let action = {type: "SET_EMAIL", payload: "someone@gmail.com"}

  return (
    <div className="App">
      <h1>UseReducer & SASS</h1>
      {/* DISPLAY CURRENT FORM STATE VALUE */}
      <h2>{JSON.stringify(state.firstName)}</h2>
      <h2>{JSON.stringify(state.lastName)}</h2>
      <h2>{JSON.stringify(state.email)}</h2>

      <form>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            name="firstName"
            onChange={(e) => changeHandler(e)}
          />
          {state.firstName.error !== "" ? <p>{state.firstName.error}</p>: null}
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            name="lastName"
            onChange={(e) => changeHandler(e)}
          />
          {state.lastName.error !== "" ? <p>{state.lastName.error}</p>: null}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            onChange={(e) => changeHandler(e)}
          />
          {state.email.error !== "" ? <p>{state.email.error}</p>: null}
        </div>
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default App
