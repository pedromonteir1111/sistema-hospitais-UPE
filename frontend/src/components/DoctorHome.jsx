import React, { useState, useEffect } from "react";
import axios from "axios";
import './DoctorHome.css';
import TableDoctor from "./TableDoctor.jsx";

//pagina home para medicos
function DoctorHome(props) {
    
    const [active, setActive] = useState('exames');
    const [response, setResponse] = useState('');

    /* a parte de requisicao nao esta pronta ainda
    useEffect(() => {
        if(active === "exames"){
            const sendReqExames = async () => {
                try {
                    var resposta = await axios.post('http://localhost:4000/api/enviar-dados/user/medico/exames', {
                        mensagem: "Quero os exames",
                    });
                    setResponse(resposta.data);

                } catch (erro) {
                    console.error('Erro ao enviar dados para o backend:', erro);
                }
            };
              
            if (!response) {
                sendReqExames();
            }
        } else {
            const sendReqPacientes = async () => {
                try {
                    var resposta = await axios.post('http://localhost:4000/api/enviar-dados/user/medico/pacientes', {
                        mensagem: "Quero os pacientes",
                    });
                    setResponse(resposta.data);

                } catch (erro) {
                    console.error('Erro ao enviar dados para o backend:', erro);
                }
            };
              
            if (!response) {
                sendReqPacientes();
            }
        }
        

    }, [active]); */
    
    return(
        <div>
            <div className="title-card">
                <h1>Olá, doutor {props.nome}</h1>
            </div>

            <div className="action-menu">
                <button onClick={() => {setActive('exames')}}>Exames</button>
                <button onClick={() => {setActive('pacientes')}}>Cadastrar Pacientes</button>
            </div>

            <div className="content-card">
                {active === "exames" && <TableDoctor/>}
            </div>
        </div>   
    )
}

export default DoctorHome;