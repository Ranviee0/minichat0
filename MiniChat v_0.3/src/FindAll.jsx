import { React, useEffect } from 'react'
import {
  getFirestore, collection, getDocs
} from 'firebase/firestore'

const db = getFirestore()
const globalList = []
const globalText = []

function FindAll() {

  const fetchMessages = async (message) => {
    const texts = [];
    try {
      const snapshot = await getDocs(collection(db, message));

      snapshot.docs.forEach(doc => {
        const text = doc.data().text;
        texts.push(text);
      });
      for (const element of texts) {
        globalList.push(element);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const fetchText = async (message) => {
    const texts = [];
    try {
      const snapshot = await getDocs(collection(db, message));

      snapshot.docs.forEach(doc => {
        const disp = doc.data().displayName;
        const text = doc.data().text;
        const out = message.toString() + ":" + disp + ":" + text
        texts.push(out);
      });
      for (const element of texts) {
        globalText.push(element);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const loopThrough = () => {
    for (const element of globalList) {
      fetchText(element);
    }
  };

  const fetchAll = async () => {
    await fetchMessages("Lists");
    loopThrough();
    console.log(globalList);
    console.log(globalText);
  }


  return (
    <div>
      <div>Find All</div>
      <div>
        <input type="text" class="text" />
        <button onClick={() => fetchAll()} class="button">Find All</button>
      </div>
    </div>
  )
}

export default FindAll