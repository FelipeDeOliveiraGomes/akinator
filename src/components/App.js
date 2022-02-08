import '../css/App.css';
import React, { useState } from 'react';
import akinatorTheme from '../audio/akinatorTheme.mp3';
import genius from '../images/genius.png';
import logo from '../images/mainLogo.png';
import UpdateInterface from './UpdateInterface'

//defines the initial value of the id and the url of the requests
let id = 1, base = 'http://localhost:5555/characters/';

function App() {
  const [image, setImage] = useState(genius); //was created as a state to be able to create in the future the feature of dynamically changing the image
  const [question, setQuestion] = useState('Is your character male?');
  const [visible, setVisible] = useState(true);
  const [winMessage, setWinMessage] = useState('Think about a character and i will try to guess who it is.');
  const [UpdateIsVisible, setUpdateIsVisible] = useState(false);
  const [character, setCharacter] = useState('');

  //reset the id value, hidden the button 'new game' and start the game
  const newGame = () => {
    id = 1;
    setVisible(false);
    setQuestion('Is your character male?')
    document.getElementById('audio').play();
  }

  //controls the registration of new characters, make the POSTS, hidden the interface, and show 'new game' button
  const addNewCharacter = () => {
    setUpdateIsVisible(true);

    const postData = (options) =>  {
      fetch(base, options)
       .then(res => console.log(res))
       .then(res => res.json())
    }

    document.addEventListener('submit', e => {
      e.preventDefault()
      let options = {
        method:"POST",
        headers: {
          "Content-type":"application/json; charset=utf-8"
        },
        body: JSON.stringify(
          { 
            id: id,
            question: `${e.target.questionInput.value}`,
            end: false,
            code: `${e.target.nameInput.value}`
          }
        )
      }
      postData(options); 
      
      let id2 = id * 2;
      options = {
        method:"POST",
        headers: {
          "Content-type":"application/json; charset=utf-8"
        },
        body: JSON.stringify(
          {
            id: id2,
            question: `Is your character ${e.target.nameInput.value}?`,
            end: false,
            code: `${e.target.nameInput.value}`
          }
        )
      }
      postData(options);

      id2 = id * 4;
      options = {
        method:"POST",
        headers: {
          "Content-type":"application/json; charset=utf-8"
        },
        body: JSON.stringify(
          {
            id: id2,
            question: `I won again!`,
            end: true,
            code: `${e.target.nameInput.value}`
          }
        )
      }
      postData(options);
      setUpdateIsVisible(false);

    })
    
    setVisible(true);
  }

  //controls whats happen after the user answered the question
  const questionHandler = (value) => {
    //These ifs are used to define the id. The id value changes according to the user's responses.
    //The id is used to define the routes of the ajax requests, each route has a unique id with
    //in order to form a database in the form of a binary tree. in this way each question or character has
    //your own route and the algorithm is able to automatically create new routes according to the answers. 
    if(value){
      id = Number(id) * 2;

    }else {
      id = Number(id) * 2 + 1;
    }

    //this structure is responsible for doing the GET to the API and in case the specified route does not exist,
    //ie, response '404', call the character registration interface to register a new character.
    const getData = () => {
      fetch(`${base}${id}`)
        .then(res => {
          if(res.status === 404) addNewCharacter()
          return res.json()
        })
        .then(res => {
          res.code && setCharacter(res.code)
          setQuestion(res.question)
          if (res.end) {
            setWinMessage(res.question);
            setVisible(true);
          }
        })
    } 
    getData()
  }

  return (
    <div className='app'>
      <audio src={akinatorTheme} id='audio'></audio>
      <div className='navbar'>
        <img src={logo} alt='logo'/> 
      </div>
      {UpdateIsVisible ? (<UpdateInterface name={character} />) : 
      (<>
      <div className='image-container'>
        <img src={image} alt='mainImage'/>
      </div>
        {!visible && (<div className='questions-board'><p>{question}</p></div>)}
        {visible && (<div className='questions-board'><p className='winMessage'>{winMessage}</p></div>)}
      <div className='buttons'> 
      {visible ? (<button className='button-newGame' visible={visible} onClick={() => newGame()}>NEW GAME</button>) : 
        (<>
        <button className="button" onClick={()=> questionHandler(true)}>YES</button>
        <button className="button" onClick={() => questionHandler(false)}>NOT</button> 
        </>)}
      </div>
      </>
      )}

    </div>
  );
}

export default App;