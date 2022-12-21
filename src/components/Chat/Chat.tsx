import {useEffect, useState} from "preact/hooks";
import {useMessage} from "../../hooks/useMessage";
import {useNavigate} from "react-router-dom";
import Message from "../Message/Message";
import React from "preact/compat";
import ChatActions from "./ChatActions/ChatActions";
import useStore from "../../store/useStore";

import './Chat.css';


const Chat = () => {
    const {user} = useStore();

    const navigate = useNavigate();
    const messageHook = useMessage();

    useEffect(()=>{
        scrollDown();
    },[messageHook.messages])
    useEffect(() => {
        if (!user) {
            navigate('/');
            return;
        }
        messageHook.createConnection();

    }, [user])

    const [showArrow,setShowArrow] = useState(false)

    const showArrowDown = (e) => {
        const scrollHeight = e.target.scrollHeight
        const lastKnownScrollPosition = e.target.scrollTop;
        setShowArrow(scrollHeight - lastKnownScrollPosition > 500)
    }
    const scrollDown = () => {
        const wrapper = document.querySelector('.chat-wrapper');
        if (!wrapper) return

        wrapper.scroll({behavior: 'smooth',top: wrapper.scrollHeight})
    }

    if (messageHook.loading) return <div>Подгружаем чат...</div>

    const messageRender = messageHook.messages.map((message, index) => <Message item={message} key={index}/>);
    const arrowDown = showArrow && <div className={'chat-arrow'} onClick={scrollDown}>Вниз</div>

    return (
        <>
            <div className={'chat'}>
                <h2>Добрый день, {user}</h2>
                <div style={{position: 'relative'}}>
                    <div className={'chat-wrapper'} onScroll={showArrowDown}>
                        {messageRender}
                        {arrowDown}
                    </div>
                </div>
                <ChatActions/>
            </div>
        </>
    )
}

export default Chat;
