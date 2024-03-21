import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import './DoctorHome.css';
import TableDoctor from "./TableDoctor.jsx";

function DoctorHome(props) {

    const [active, setActive] = useState('exames');
    const [pacientes, setPacientes] = useState([]);

    useEffect(() => {
        const sendReq = async () => {        
            try {
                await axios.post('http://localhost:4000/api/enviar-dados/user/medico/pacientes', {
                    mensagem: "Quero os pacientes",
                }).then(resp => {setPacientes(resp.data); console.log(pacientes)});

            } catch (erro) {
                console.error('Erro ao enviar dados para o backend:', erro);
            }
        }          

        if (!!pacientes) {
            sendReq();
        }     
    }, []);

    return(
        <div className="homepage">
            <div className="title-card">
                <h1>Olá, doutor {props.nome}</h1>
            </div>

            <div className="action-menu">
                <button className={active === 'exames' ? 'btn-active' : 'btn'} onClick={() => {setActive('exames')}}>Exames</button>
                <button className={active === 'pacientes' ? 'btn-active' : 'btn'} onClick={() => {setActive('pacientes')}}>Pacientes</button>
            </div>

            <div className="content-card">
                <div className={active === "pacientes" ? 'button-show' : 'button-hidden'}>
                    <Link to="/register">
                        <button className="registrar-btn">Cadastrar Paciente</button>
                    </Link>
                </div>

                {active === "exames" && <TableDoctor data={pacientes} type="exames"/>}
                {active === "pacientes" && <TableDoctor data={pacientes} type="pacientes"/>}
            </div>
        </div>   
    )
}

export default DoctorHome;