import React, { useState, useContext, useEffect } from 'react'
import { FirebaseContext } from '../firebase'
import Loader from '../loader'
import Logout from '../logout'
import Quiz from '../quiz'

const Welcome = (props) => {

  const firebase = useContext(FirebaseContext)
  const [userSession, setUserSession] = useState(null)
  const [userData, setUserData] = useState({})

  useEffect(() => {
    let listener = firebase.auth.onAuthStateChanged(user => {
      user ? setUserSession(user) : props.history.push('/');
    })

    if(userSession !== null) {
      firebase.user(userSession.uid).get().then(doc => {
        if(doc && doc.exists) {
          const myData = doc.data()
          setUserData(myData)
        }
      }).catch( error => {
        console.log(error)
      })
    }

    return () => {
      listener()
    }
  }, [firebase, props.history, userSession])

  return userSession === null ? (
    <Loader 
        loadingMsg={"Authentification"}
        styling={{textAlign: "center", color: "#FFFFFF"}}
       />
  ) : (
    <div className="quiz-bg">
      <div className="container">
          <Logout />
          <Quiz userData={userData} />
      </div>
    </div>
  )
  
 
}

export default Welcome
