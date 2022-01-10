import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore'

let config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

class Firebase {
  constructor() {
    app.initializeApp(config)
    this.auth = app.auth()
    this.db = app.firestore()
  }

  // inscription
  signupUser = (email, password) => this.auth.createUserWithEmailAndPassword(email, password);

  // Connexion
  loginUser = (email, password) => this.auth.signInWithEmailAndPassword(email, password)

  // Déconnexion
  signoutUser = () => this.auth.signOut()

  // Récupération du mot de passe
  passwordReset = email => this.auth.sendPasswordResetEmail(email) 

  user = uId => this.db.doc(`users/${uId}`)
}

export default Firebase