import React, { useState, UseEffect, useEffect } from 'react'
import axios from 'axios'
import { getUserId } from '../lib/UserToken'
import io from 'socket.io-client'
import Footer from './Navbar'
import Send from '../images/send.png'
import Back from '../images/previous.png'
import { Link } from 'react-router-dom'

const endPoint = process.env.DATABASE_URL

let socket = ''

const ChatPage = (props) => {
  const currUserID = getUserId()
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('')
  const [currentUser, updateCurrentUser] = useState('')
  const [connected, updateConnect] = useState(false)

  useEffect(() => {
    socket = io.connect(`${endPoint}`)

    socket.on('connect', () => {
      socket.emit('join_room', {
        username: `${currentUser.first_name}`,
        room: `${props.match.params.chatID}`
      })
      console.log('connected!')
      updateConnect(true)
    })
  

    console.log('check check')
    axios.get(`/api/users/${currUserID}`)
      .then(res => {
        const resData = res.data
        updateCurrentUser(resData)
      })


    axios.get(`/api/chat/${props.match.params.chatID}`)
      .then(resp => {
        const data = resp.data
        console.log(resp.data)
        if (!data.chat_history) {
          return
        }
        setMessages(data.chat_history)
      })
  }, [])



  const getMessages = () => {

    socket.on('receive_message', function (data) {
      setMessages([...messages, data.message])
      const update = {
        chat_history: [...messages, data.message]
      }
      axios.put(`/api/chat/${props.match.params.chatID}`, update)
        .then(resp => {
          console.log(resp.data)
        })
    })
  }





  useEffect(() => {
    getMessages()
  }, [messages.length])

  const onChange = e => {
    setMessage(e.target.value)
  }

  const onClick = () => {
    if (message !== '') {
      socket.emit('send_message', {
        username: `${currentUser}`,
        room: `${props.match.params.chatID}`,
        message: `${currentUser.first_name}: ${message}`
      })
      setMessage('')
    } else {
      alert('Please add a message')
    }
  }

  return <main className="chatMain">
    <header>
      <div className="backButton">
        <Link to={'/matches'}>
        <img src={Back} alt="back"/>
        </Link>
      </div>
      <div className="heading">
         <h1>Spoondr.</h1>
      </div>
      <div className="backButton"></div>
    </header>
    <div className="chatContainer">
      <div className="chatInner">
        {messages.map((msg, key) => {
        return <div key={key}>
          <p>{msg}</p>
        </div>
      })}
      </div>
      <div className="chatInput">
        <input value={message} name="message" onChange={e => onChange(e)} />
      <button onClick={() => onClick()}>
        <img src={Send} alt="send message" />
      </button>
      </div>
      
    </div>


    <Footer />
  </main>
}

export default ChatPage