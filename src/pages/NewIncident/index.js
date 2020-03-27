import React, { useState } from 'react';
import './styles.css';
import { Link, useHistory } from 'react-router-dom'
import logoImg from '../../assets/logo.svg';
import '../../global.css'
import { FiArrowLeft } from 'react-icons/fi';
import api from '../services/api'


export default function NewIncident() {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [value, setValue] = useState('')
    const history = useHistory()
    const ongID = localStorage.getItem("ongId");

    async function handleCreateIncidents(e) {
        e.preventDefault();
        const data = {
            title,
            description,
            value
        };
        try {
            const response = await api.post('incidents', data,{
                headers: {
                    authorization: ongID
                }
            });
            alert(`Incidente criado com sucesso`);
            history.push("/profile")
        } catch(err){
            alert("Erro no cadastro, tente novamente.")
        }
    }

    return (
        <div className="incidents-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color={'#E02041'} />
                    Voltar para home
                </Link>
                </section>

                <form onSubmit={handleCreateIncidents}>
                    <input
                        placeholder="Titulo do caso"
                        value={title}
                        onChange={e => {
                            setTitle(e.target.value)
                        }}
                    />
                    <textarea
                        placeholder="Descrição"
                        value={description}
                        onChange={e => {
                            setDescription(e.target.value)
                        }}
                    />
                    <input
                        placeholder="Valor em reais"
                        value={value}
                        onChange={e => {
                            setValue(e.target.value)
                        }}
                    />

                    <button className="button" type="submit">
                        Cadastrar
                </button>
                </form>
            </div>
        </div>
    )
}