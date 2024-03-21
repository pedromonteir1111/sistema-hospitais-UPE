import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import './DoctorHome.css';
import TableDoctor from "./TableDoctor.jsx";

function DoctorHome(props) {

    const [active, setActive] = useState('exames');
    const [pacientes, setPacientes] = useState([]);
    var [cpf, setCPF] = useState();
    const navigate = useNavigate();

    var mensagem_de_saida;
    var sair = false;

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
    
    var vincular = async (e) => {
        e.preventDefault()
        try {
            await axios.post('http://localhost:4000/api/enviar-dados/user/medico/pacientes/vincular', {
                mensagem: "Quero vincular um paciente",
                cpf: cpf
            });

        } catch (erro) {
            console.error('Erro ao enviar dados para o backend:', erro);
        }
        navigate('/login');

    }

    const logout = async () => {
        console.log('Função logout chamada');
        mensagem_de_saida = 'Quero sair';
      
        try {
          var resposta = await axios.post('http://localhost:4000/api/enviar-dados/logout', {
            mensagem: mensagem_de_saida,
          });
          
          console.log('Enviou')
        //   setComando_sair(resposta.data);
      
          // Coloque o restante do código aqui, se necessário
          if (resposta.data.mensagem === 'Saia') {
            navigate('/login');
          }
        } catch (erro) {
          console.error('Erro ao enviar dados para o backend:', erro);
        }
      };

      function alternar_estado(sair){
        // console.log('Função alternar_estado chamada. Antes:', sair);
        sair = !sair;
        // console.log('Função alternar_estado chamada. Depois:', sair);
        if(sair == true){
            logout();
        }
    }

    return(
        <div className="homepage">
            <div className="title-card">
                <h1>Olá, doutor {props.nome}</h1>
                <a style={{ cursor: 'pointer' }}  className="buttonSair" onClick={() => alternar_estado(sair)}>
                        Sair
                </a>
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
                    <div>
                    <form className = 'login-form' onSubmit={vincular}>
                    <input type="text"
                    name="cpf" placeholder="CPF"
                    onChange={(e) => setCPF(e.target.value)}
                    value={cpf}
                    />
                    <button className="registrar-btn">Vincular Paciente</button>
                    </form>
                    </div>
                </div>

                {active === "exames" && <TableDoctor data={pacientes} type="exames"/>}
                {active === "pacientes" && <TableDoctor data={pacientes} type="pacientes"/>}
            </div>
        </div>   
    )
}

export default DoctorHome;