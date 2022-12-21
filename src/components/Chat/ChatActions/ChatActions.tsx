import React from "preact/compat";
import {useState} from "preact/hooks";
import {useMessage} from "../../../hooks/useMessage";
import useStore from "../../../store/useStore";


const ChatActions = () => {
    const {user} = useStore();

    const messageHook = useMessage();
    const [input, setInput] = useState('');
    const sendMessage = (e) => {
        const enter = 13
        if (e.keyCode !== enter) return;
        messageHook.sendMessage({message: input, author: user});
        setInput('');
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column', marginTop: '15px'}}>
            <input onInput={(e) => setInput(e.target.value)} value={input} onKeyPress={sendMessage}>Введите сообщение</input>
        </div>
    )
}

export default ChatActions;
