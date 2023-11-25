import { useParams, NavLink } from "react-router-dom";
import { useState, useEffect } from 'react'
import "./App.css";
import { onAuthStateChanged } from 'firebase/auth'
import { getFirestore, onSnapshot, collection, addDoc, orderBy, query, serverTimestamp, limit } from 'firebase/firestore'
import { auth, app } from './firebase'
const db = getFirestore(app)
const sentRooms = [];

function Chat() {

    const [user, setUser] = useState(null)
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState("")
    const { id } = useParams();
    const [messageItems, setMessageItems] = useState([]);
    let dbCollection = "messages" + id;
    var nextId = parseInt(id) + parseInt('1');
    let nextChat = "/chat/" + nextId;
    var prevId = id - 1;
    let prevChat = "a";
    if (id === '1') {
        prevChat = "/chat/1"
    } else {
        prevChat = "/chat/" + prevId;
    }

    useEffect(() => {
        const q = query(collection(db, dbCollection), orderBy("timestamp", "desc"), limit(25));
        const unsubscribe = onSnapshot(q, snapshot => {
            setMessages(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })
        return unsubscribe
    }, [id])

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                setUser(user)
            } else {
                setUser(null)
            }
        })
    }, [])

    const sendMessage = async () => {
        await addDoc(collection(db, dbCollection), {
            uid: user.uid,
            displayName: user.displayName,
            text: newMessage,
            timestamp: serverTimestamp()
        })
        await addDoc(collection(db, "messagesIndex"), {
            uid: user.uid,
            displayName: user.displayName,
            text: newMessage,
            timestamp: serverTimestamp()
        })

        setNewMessage("")
    }

    useEffect(() => {
        const updatedMessageItems = messages.map(msg => (
            <div key={msg.id}>
                <p>{msg.data.displayName} : {msg.data.text}</p>
            </div>
        ));
        setMessageItems(updatedMessageItems);
    }, [messages]); // Watch for changes in 'messages' state

    return (
        <div>
            {user ? (
                <div>
                    <div> Logged in as {user.displayName}</div>
                    <div> Chatroom {id}</div>
                    <div className="flex-container">
                        <div>
                            <NavLink to={prevChat}>Previous</NavLink>
                        </div>
                        <div>
                            <NavLink to={nextChat}>Next</NavLink>
                        </div>
                    </div>

                    <input
                        class="text"
                        value={newMessage}
                        onChange={e => setNewMessage(e.target.value)}
                    />
                    <button onClick={sendMessage} class="button">Send Message</button>

                    <div>
                        {messageItems}
                    </div>
                </div>
            ) :
                <p></p>
            }
        </div>
    )
}

export default Chat
