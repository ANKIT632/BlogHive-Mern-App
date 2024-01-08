
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyApJUgPPMcr7wySv70Tt4jZ-eStI0Sn0QU",
  authDomain: "bloghive-f8d94.firebaseapp.com",
  projectId: "bloghive-f8d94",
  storageBucket: "bloghive-f8d94.appspot.com",
  messagingSenderId: "274319172580",
  appId: "1:274319172580:web:0cf61dae0c361cc00d9df1"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// google auth
const provider = new GoogleAuthProvider();

const auth = getAuth();

export const authWithGoogle = async () => {
  let user = null;

  await signInWithPopup(auth, provider)
    .then((result) => {
      user = result.user;
    })
    .catch((err) => {
      console.log(err);

    })
  return user;
}

// we can also use try catch rather than then catch, it is same thing.
