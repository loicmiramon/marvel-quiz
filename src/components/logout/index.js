import React, { useEffect, useState, useContext } from 'react'
import ReactTooltip from 'react-tooltip'
import { FirebaseContext } from '../firebase'

const Logout = () => {

  const firebase = useContext(FirebaseContext)

  const [checked, setChecked] = useState(false)

  useEffect(() => {
    if(checked) {
      firebase.signoutUser()
    } 
  }, [checked, firebase])

  const handleChange = e => {
    setChecked(e.target.checked)
  }

  return (
    <div className="logoutContainer">
      <label className="switch">
        <input type="checkbox" checked={checked} onChange={handleChange} />
        <span className="slider round" data-tip="Déconnexion"></span>
      </label>
      <ReactTooltip place={"left"} effect={"solid"} />
    </div>
  )
}

export default Logout
