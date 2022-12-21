import useStore from "../../store/useStore";
import {useState} from "preact/hooks";
import {useNavigate} from "react-router-dom";
import React from "preact/compat";

const Auth = () => {
    const {user, setUser} = useStore();
    const [name,setName] = useState('');
    const navigate = useNavigate()


    const login = () => {
        if (!name) return;

        setUser(name);
        setName('');
        navigate("/chat")
    }


    return (
        <div style={{margin: '0 auto',width:'300px',display: 'flex',justifyContent:'center',flexDirection: 'column'}}>
            <p>Вход</p>
            <input onInput={(e) => setName(e.target.value)} value={name}  placeholder={'Введите имя'}/>
            <button onClick={login} style={{marginTop: '10px'}}>войти</button>
        </div>
    )
}

export default Auth;
