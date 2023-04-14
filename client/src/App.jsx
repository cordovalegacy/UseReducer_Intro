import { useReducer } from 'react'
import './App.css'

function App() {

  // *****************************FEED TO USEREDUCER FUNCTION PARAMETERS**********************************
  const initialFormState = { //HOLDS EACH INPUT FIELD AS A NESTED OBJECT
    firstName: { //HOLDS BOTH VALUE AND ERROR KEYS AND VALUES
      value: "",
      error: ""
    },
    lastName: { //HOLDS BOTH VALUE AND ERROR KEYS AND VALUES
      value: "",
      error: ""
    },
    email: { //HOLDS BOTH VALUE AND ERROR KEYS AND VALUES
      value: "",
      error: ""
    }
  }

  // *****************************FEED TO USEREDUCER FUNCTION PARAMETERS**********************************
  // An action is JUST A JAVASCRIPT OBJECT {}, or set of key value pairs, with 2 distinct keys
  // let action = {type: "SET_EMAIL", payload: "someone@gmail.com"}

  const reducer = (state, action) => { //HOLDS CURRENT STATE, AND ACTION OBJECT
    switch (action.type) { //ACTION OBJECT HOLDS TWO PROPERTIES: TYPE & PAYLOAD
      case "SET_FIRST_NAME": //TYPE
        return { //PAYLOAD
          ...state,
          firstName: {
            ...state.firstName,
            value: action.payload
          }
        }
      case "SET_LAST_NAME": //TYPE
        return { //PAYLOAD
          ...state,
          lastName: {
            ...state.lastName,
            value: action.payload
          }
        }
      case "SET_EMAIL": //TYPE
        return { //PAYLOAD
          ...state,
          email: {
            ...state.email,
            value: action.payload
          }
        }
      case "SET_FIRST_NAME_ERROR": //TYPE
        return { //PAYLOAD
          ...state,
          firstName: {
            ...state.firstName,
            error: action.payload
          }
        }
      case "SET_LAST_NAME_ERROR": //TYPE
        return { //PAYLOAD
          ...state,
          lastName: {
            ...state.lastName,
            error: action.payload
          }
        }
      case "SET_EMAIL_ERROR": //TYPE
        return { //PAYLOAD
          ...state,
          email: {
            ...state.email,
            error: action.payload
          }
        }
      default: //TYPE
        return state //PAYLOAD
    }
  }

  // *****************************************USEREDUCER HOOK*********************************************

  const [state, dispatch] = useReducer(reducer, initialFormState) //USEREDUCER HOOK (MUST BE BELOW REDUCER AND INITAL STATE)

  // *****************************CHANGE HANDLER FUNCTION (FIELD: VALUES & ERRORS)************************

  const changeHandler = (e) => { //UPDATES STATE DEPENDENT ON E.TARGET.NAME AND E.TARGET.VALUE
    console.log(e)
    //IF CONDITION IS TRUE, IT WILL RUN *TUNNEL ONE* (ERROR HANDLER)
    //IF CONDITION IS NOT TRUE IT WILL RUN *TUNNEL TWO* (VALUE HANDLER)
    if (e.target.value.length < 3) { //NAME AITTRIBUTE ON INPUT FIELDS
      // TUNNEL ONE (ERROR HANDLER)
      if (e.target.name === "firstName") { //SETTING FIRSTNAME ERRORS
        dispatch({ //SETTER (USES ACTION OBJECT FROM REDUCER FUNCTION: TYPE, PAYLOAD)
          type: "SET_FIRST_NAME_ERROR",
          payload: "First Name Must Be At Least 3 Characters"
        })
      }
      else if (e.target.name === "lastName") { //SETTING LASTNAME ERRORS
        dispatch({ //SETTER (USES ACTION OBJECT FROM REDUCER FUNCTION: TYPE, PAYLOAD)
          type: "SET_LAST_NAME_ERROR",
          payload: "Last Name Must Be At Least 3 Characters"
        })
      }
      else if (e.target.name === "email") { //SETTING EMAIL ERRORS
        dispatch({ //SETTER (USES ACTION OBJECT FROM REDUCER FUNCTION: TYPE, PAYLOAD)
          type: "SET_EMAIL_ERROR",
          payload: "Email Address Must Be Valid"
        })
      }
    }
    // TUNNEL TWO (VALUE HANDLER)
    else {
      if (e.target.name === "firstName") { //SETTING FIRSTNAME VALUES AND CLEARING ERRORS
        dispatch({ //SETTER (USES ACTION OBJECT FROM REDUCER FUNCTION: TYPE, PAYLOAD)
          type: "SET_FIRST_NAME",
          payload: e.target.value
        })
        dispatch({ //SETTER (USES ACTION OBJECT FROM REDUCER FUNCTION: TYPE, PAYLOAD)
          type: "SET_FIRST_NAME_ERROR",
          payload: ""
        })
      }
      if (e.target.name === "lastName") { //SETTING FIRSTNAME VALUES AND CLEARING ERRORS
        dispatch({ //SETTER (USES ACTION OBJECT FROM REDUCER FUNCTION: TYPE, PAYLOAD)
          type: "SET_LAST_NAME",
          payload: e.target.value
        })
        dispatch({ //SETTER (USES ACTION OBJECT FROM REDUCER FUNCTION: TYPE, PAYLOAD)
          type: "SET_LAST_NAME_ERROR",
          payload: ""
        })
      }
      if (e.target.name === "email") { //SETTING FIRSTNAME VALUES AND CLEARING ERRORS
        dispatch({ //SETTER (USES ACTION OBJECT FROM REDUCER FUNCTION: TYPE, PAYLOAD)
          type: "SET_EMAIL",
          payload: e.target.value
        })
        dispatch({ //SETTER (USES ACTION OBJECT FROM REDUCER FUNCTION: TYPE, PAYLOAD)
          type: "SET_EMAIL_ERROR",
          payload: ""
        })
      }
    }
  }

  // **********************************************JSX*******************************************

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
          {state.firstName.error !== "" ? <p>{state.firstName.error}</p> : null}
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            name="lastName"
            onChange={(e) => changeHandler(e)}
          />
          {state.lastName.error !== "" ? <p>{state.lastName.error}</p> : null}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            onChange={(e) => changeHandler(e)}
          />
          {state.email.error !== "" ? <p>{state.email.error}</p> : null}
        </div>
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default App
