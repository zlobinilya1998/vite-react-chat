import './Message.css'

type Message = {
    author: string;
    message: string;
    date: Date;
}

type MessageProps = {
    item: Message;
    key: number;
}

const Message = (props: MessageProps) => {
    const {item} = props;

    const time = new Date(item.date).toLocaleTimeString('ru')

    return (
        <div className={'chat-message'}>
            <h3 className={'message-author'}>{item.author}</h3>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <span className={'message-text'}>{item.message}</span>
                <span className={'message-time'}>{time}</span>
            </div>
        </div>
    )
}
export default Message;
