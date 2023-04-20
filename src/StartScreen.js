import React from 'react';
import './StartScreen.css';
function StartScreen(props) {
    return props.revealStartScreen ?
            (
                    <div className='StartScreen'>
                        <h1>EdgyEvents by TheLeathers</h1>
                        <p>
                            You must use the Google Login to prove that you are a human
                            before you can access the site...
                        </p>
                        <div align='center'>
                            <button onClick={() => {props.getAccessToken()}} className='toggler'>
                                <b>GOOGLE LOGIN PAGE</b>
                            </button>
                        </div>
                        <a href='https://delacorteclock.github.io/meet/edgy.html'>
                            The Edgy Guarantee: Privacy Info
                        </a>
                    </div>
                    )
            : null;
}
export default StartScreen;
