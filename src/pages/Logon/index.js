import React, { useState } from 'react';
import './styles.css';
import { Link, useHistory } from 'react-router-dom'
import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';
import { FiLogIn } from 'react-icons/fi';
import '../../global.css'
import api from '../services/api';

export default function Logon() {
    const [id, setID ] = useState("")
    const history = useHistory()

    async function handleLogon(e){
        e.preventDefault();
        const data = {
            id
        };
        try {
            const response = await api.post('sessions', data);

            localStorage.setItem("ongId", id)
            localStorage.setItem("ongName", response.data.name)

            history.push("/profile")
        } catch(err){
            alert("Erro no login, tente novamente.")
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt={'Be The Hero'} />
                <form onSubmit={handleLogon}>
                    <h1>Faça seu logon</h1>
                    <input 
                        placeholder="Sua ID"
                        value={id}
                        onChange={e => {
                            setID(e.target.value)
                        }}    
                    />
                    <button type={'submit'} className={'button'}>
                        Entrar
                    </button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color={'#E02041'} />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
            <img src={heroesImg} alt={'Heroes'} />
        </div>
    )
}