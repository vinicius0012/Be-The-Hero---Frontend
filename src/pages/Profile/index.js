import React, { useEffect, useState } from 'react';
import './styles.css';
import logoImg from '../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom'
import { FiPower, FiTrash2 } from 'react-icons/fi'
import './styles.css'
import api from '../services/api'

export default function Profile() {

    const ongName = localStorage.getItem("ongName");
    const ongID = localStorage.getItem("ongId");
    const [incidents, setIncidents] = useState([])
    const history = useHistory()
    
    useEffect(() => {
        api.get('profile', {
            headers: {
                authorization: ongID
            }
        }).then(response => {
            setIncidents(response.data)
        })
    }, [ongID])

    async function handleDeleteIncident(id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    authorization: ongID
                }
            });
            setIncidents(incidents.filter(incident => incident.id !== id))
        } catch (err) {
            alert('Erro ao deletar caso, tente novamente!')
        }
    }

    async function handleLogout() {
        localStorage.removeItem("ongId")
        localStorage.removeItem("ongName")
        history.push("/")
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero" />
                <span> Bem vinha, {ongName}</span>

                <Link className={"button"} to="/incidents/new">
                    Cadastrar novo caso
                </Link>
                <button type="button"  onClick={handleLogout}>
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1>
                Casos cadastrados
            </h1>

            <ul>
                {incidents && incidents.map(({ id, title, description, value }) => (
                    <li key={id}>
                        <strong>Caso:</strong>
                        <p>{title}</p>

                        <strong>Descrição:</strong>
                        <p>{description}</p>

                        <strong>valor:</strong>
                        <p>{Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                        }).format(value)}</p>

                        <button type='button' onClick={() => handleDeleteIncident(id)}>
                            <FiTrash2 size={20} color="#A8A8B3" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}