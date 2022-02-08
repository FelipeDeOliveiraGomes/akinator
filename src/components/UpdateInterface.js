import React, { useState, useEffect } from 'react';
import '../css/UpdateInterface.css';

export default function UpdateInterface(props) {

  return(
    <form>
      <label className='label'> 
        please create a question that helps me differentiate
        your character from {`${props.name}`}  by citing a difference between
        them. For example, if your character has white hair and {`${props.name} `} 
        doesnt: "Does your character have white hair?" 
      </label>
      <input type='text' name='questionInput' placeholder='Write the question here'></input>
      <input type='text' name='nameInput' placeholder='your character name'></input>
      <input className='sendButton' type='submit' value='SEND'></input>
    </form>
  )
}