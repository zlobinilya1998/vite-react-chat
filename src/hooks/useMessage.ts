import {useState} from "preact/hooks";

export const useMessage = () => {
    const socket = new WebSocket("ws://localhost:3000");
    const [messages, setMessages] = useState([]);
    const [loading,setLoading] = useState(false);
    const createConnection = async () => {
        setLoading(true)
        try {
            socket.onopen = () => alert("Соединение установлено.");
            socket.onclose = function (event) {
                if (event.wasClean) {
                    alert('Соединение закрыто чисто');
                } else {
                    alert('Обрыв соединения'); // например, "убит" процесс сервера
                }
                alert('Код: ' + event.code + ' причина: ' + event.reason);
            };
            socket.onerror = function (error) {
                alert("Ошибка " + error.message);
            };
            socket.onmessage = (e) => {
                const newMessages = JSON.parse(e.data);
                setMessages(newMessages)
            };
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
        }

    }

    const sendMessage = (data: any) => {
        const newMessage = JSON.stringify(data);
        socket.send(newMessage);
    };

    const clearMessages = () => {
        socket.send('custom-event')
    }

    return {
        createConnection,
        clearMessages,
        sendMessage,
        setMessages,
        messages,
        loading,
    }
}

