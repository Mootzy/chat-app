import React, {useEffect, useRef, useStat} from 'react';
import firebase from 'firebase/app'
import 'firebase/firestore';
import 'firebase/auth';
import logo from './logo.svg';
import './App.css';

import {useAuthState} from 'react-firebase-hooks/auth'
import {useCollectionData} from 'react-firebase-hooks/firesore';

firebase.initializeApp({

})

const auth = firebase.auth();
const firestore = firebase.firestore();


export default function App() {

const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>
        <h1>
        ⚛️🔥💬
        </h1>
        <SignOut />
      </header>

      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>
    </div>
  );
}

function SignOut() {

  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>Sign Out</button>
  )
}

function SignIn() {

  const signInWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.SignInWithPopup(provider);
  }
  return (
    <button onClick={signInWithGoogle}>Sign in with Google</button>
  )
}
function ChatRoom() {

  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limitedToLast(25);

  const [messages] = useCollectionData(query, {idField: 'id' });


}
function ChatMessage() {}
