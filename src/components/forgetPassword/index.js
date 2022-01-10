import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { FirebaseContext } from '../firebase'


const ForgetPassword = (props) => {

  const firebase = useContext(FirebaseContext)
  const [email, setEmail] = useState('')
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState(null)

  const handleSubmit = e => {
    e.preventDefault()
    firebase.passwordReset(email).then(() => {
      setError(null)
      setSuccess(`Consultez votre adresse email ${email} pour changer le mot de passe`)
      setEmail('')
      setTimeout(() => {
        props.history.push('/login')
      }, 5000)
    }).catch(error => {
      setError(error)
      setEmail('')
    })
  }

  const disabled = email === '';

  return (
    <div className="signUpLoginBox">
    <div className="slContainer">
    <div className="formBoxLeftForget"></div>
      <div className="formBoxRight">
        <div className="formContent">
          {success && <span 
          style={{
            border: '1px solid green',
            background: 'green',
            color: 'white'
          }}>{success}
          </span>}
          {error && <span>{error.message}</span>}
          <h2>Mot de passe oublié ?</h2>
          <form onSubmit={handleSubmit}>
            <div className="inputBox">
              <input onChange={e => setEmail(e.target.value)} value={email} type="email" autoComplete="off" required />
              <label htmlFor="email">Email</label>
            </div>
            <button disabled={disabled}>Récuperer</button>
          </form>
          <div className="linkContainer">
            <Link className="simpleLink" to="/login">Déjà inscrit ? connectez vous.</Link>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default ForgetPassword