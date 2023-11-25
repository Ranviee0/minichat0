import React, { useState } from 'react';
import { useParams, NavLink } from "react-router-dom";
import { useEffect } from 'react'
import "./App.css";
import { onAuthStateChanged } from 'firebase/auth'
import { getFirestore, onSnapshot, collection, addDoc, orderBy, query, serverTimestamp, limit } from 'firebase/firestore'
import { auth, app } from './firebase'
const db = getFirestore(app)

function ToggleTextArea() {

    const [messages, setMessages] = useState([])
    const [messages2, setMessages2] = useState([])
    const [user, setUser] = useState(null)
    const { id } = useParams();
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState('Initial text');
    const [isEditingURL, setIsEditingURL] = useState(false);
    const [URL, setURL] = useState('https://upload.wikimedia.org/wikipedia/th/2/27/Bliss_%28Windows_XP%29.png');
    let dbCollection = "text_" + id;
    let dbCollection2 = "url_" + id;

    useEffect(() => {
        const q = query(collection(db, dbCollection), orderBy("timestamp", "desc"), limit(1));
        const unsubscribe = onSnapshot(q, snapshot => {
            setMessages(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })
        return unsubscribe
    }, [])

    useEffect(() => {
        const q2 = query(collection(db, dbCollection2), orderBy("timestamp", "desc"), limit(1));
        const unsubscribe = onSnapshot(q2, snapshot => {
            setMessages2(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })
        return unsubscribe
    }, [])

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                setUser(user)
            } else {
                setUser(null)
            }
        })
    }, [])

    async function updateText() {
        handleToggleEdit();
        await sendMessage();
    }

    async function updateURL() {
        handleToggleURLEdit();
        await sendURL();
    }

    const sendMessage = async () => {
        await addDoc(collection(db, dbCollection), {
            uid: user.uid,
            displayName: user.displayName,
            text: text,
            timestamp: serverTimestamp()
        })
    }

    const sendURL = async () => {
        await addDoc(collection(db, dbCollection2), {
            uid: user.uid,
            displayName: user.displayName,
            text: URL,
            timestamp: serverTimestamp()
        })
    }

    const handleToggleEdit = () => {
        setIsEditing(!isEditing);
    };

    const handleToggleURLEdit = () => {
        setIsEditingURL(!isEditingURL);
    };

    const handleTextChange = (event) => {
        setText(event.target.value);
    };

    const handleURLChange = (event) => {
        setURL(event.target.value);
    };

    return (
        <div>
            <h1>{id}</h1>
            <div>
                {isEditingURL ? (
                    <div>
                        <textarea
                            value={URL}
                            onChange={handleURLChange}
                            rows={4}
                            cols={50}
                        />
                        <button onClick={updateURL}>OK</button>
                    </div>
                ) : (
                    <div>
                        <div>
                            {messages2.map(msg => (
                                <div>
                                    <div key={msg.id} >
                                        {msg.data.text}
                                    </div>
                                    <div >
                                        <img src={msg.data.text} alt="Error"></img>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button onClick={handleToggleURLEdit}>Change</button>
                    </div>
                )}
            </div>
            <div>
                {isEditing ? (
                    <div>
                        <textarea
                            value={text}
                            onChange={handleTextChange}
                            rows={4}
                            cols={50}
                        />
                        <button onClick={updateText}>OK</button>
                    </div>
                ) : (
                    <div>
                        <div>
                            {messages.map(msg => (
                                <div key={msg.id} >
                                    {msg.data.text}
                                </div>
                            ))}
                        </div>
                        <button onClick={handleToggleEdit}>Change</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ToggleTextArea;
