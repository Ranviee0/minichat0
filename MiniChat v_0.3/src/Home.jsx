import React from 'react'
import { auth } from './firebase'

function Home() {
    return (
        <div>
            <div>Welcome to MiniChat</div>
            <button onClick={() => auth.signOut()}
                class="button"
            >Logout</button>
        </div>
    )
}

export default Home