import React, { useState } from 'react';
import axios from 'axios';
import './ChatComponent.css'; 


const ChatComponent = () => { 
    const [inputText, setInputText] = useState('');
    const [chatHistory, setChatHistory] = useState([]);

    const handleInputChange = (event) => {
        setInputText(event.target.value);
    };

    const sendMessage = async () => {
        try {
            const response = await axios.post(`http://localhost:8000/api/gemini-chat/`, { message: inputText, url:"https://web.archive.org/" }); 
            setChatHistory([...chatHistory, { sender: 'user', message: inputText }, { sender: 'AI', message: response.data.reply }]);
            setInputText('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div className="chat-container"> 
            <div className="chat-history"> 
                {chatHistory.map((chat, index) => (
                    <div key={index} className={`message ${chat.sender}`}>
                        <span className="sender">{chat.sender === 'user' ? 'You: ' : 'AI: '}</span>
                        <span className="message-text">{chat.message}</span>
                    </div>
                ))}
            </div>
            <input type="text" value={inputText} onChange={handleInputChange} className="input-field" /> 
            <button onClick={sendMessage} className="send-button">Send</button>
        </div>
    );
};

export default ChatComponent;


