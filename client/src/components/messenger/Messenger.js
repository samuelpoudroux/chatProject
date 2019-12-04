import React, {useEffect } from 'react';
import {Button,  Form, Input, Icon, Col, Row} from 'antd';
import { ChatFeed, Message } from 'react-chat-ui'

const Messenger = ({messages=[
    new Message({
      id: 0,
      message: "I'm the recipient! (The person you're talking to)",
      senderName:'tata' 
    }), // Gray bubble
    new Message({
        id: 1,
        message: "I'm the recipient! (The person you're talking to)",
        senderName:'tata' 
      }),
    // Blue bubble
  ], is_typing= true}) => {
    useEffect(() => {
      },[]);
      
return   <ChatFeed
messages={messages} // Boolean: list of message objects
isTyping={false} // Boolean: is the recipient typing
hasInputField={false} // Boolean: use our input, or use your own
showSenderName ={true}// show the name of the user who sent the message
bubblesCentered={false} //Boolean should the bubbles be centered in the feed?
// JSON: Custom bubble styles
bubbleStyles={
  {
    text: {
      fontSize: 20
    },
    chatbubble: {
      borderRadius: 70,
      padding: 40,
    }
  }
}
/>
    
}

export default Messenger