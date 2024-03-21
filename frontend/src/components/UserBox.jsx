import React, { useState, useEffect } from 'react';
import logo from "./logo.png"
import procape from "./procape.jpg"
import huoc from "./huoc.jpg"
import cisam from "./cisam.png"
import {useNavigate} from 'react-router-dom';
import './UserBox.css'
import axios from 'axios';
import DoctorHome from './DoctorHome';


function UserBox() {
    var nome;
    var sair = false;
    var mensagem = 'Quero saber o usuário';
    var mensagem_de_saida;
    const navigate = useNavigate();

    var [respostaDoBackend, setRespostaDoBackend] = useState('');
    // var [comando_sair, setComando_sair] = useState('');
    // const history = useHistory();
    
    useEffect(() => {
        const enviarDadosParaBackend = async () => {
            try {
                var resposta = await axios.post('http://localhost:4000/api/enviar-dados/user', {
                    mensagem: mensagem,
                });
                setRespostaDoBackend(resposta.data);
            } catch (erro) {
                console.error('Erro ao enviar dados para o backend:', erro);
            }
        };
          
        if (!respostaDoBackend) {
            enviarDadosParaBackend();
        }
    }, []);

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
    console.log(sair) 

    try{
        if(respostaDoBackend.mensagem == 'Login negado'){
            navigate('/login');
        }
    }
    catch{

    }

    if(respostaDoBackend === null){
        return(
            <div>Carregando...</div>
        )
    }
    else if(respostaDoBackend.mensagem === 'Login negado'){
        return(
            <div>Faça Login novamente!</div>
        )
    }
    else{
        if (respostaDoBackend.isMedico){
            return(
                <div className='doctor-home'><DoctorHome nome={respostaDoBackend.nome}/></div>
            );
        } else if (!respostaDoBackend.isMedico){
            return (
                <html lang="pt-br" dir="ltr">
                <head>
                    <meta charSet="utf-8" />
                    <title>Site dos Hospitais UPE</title>
                    <link rel="stylesheet" href="styles.css" />
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="true"
                    />
                    <link
                    href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
                    rel="stylesheet"
                    />
                </head>
                <body>
                    <div className="fundo">
                    <div className="center">
                        <a href="#" className="logo">
                    <ul className="menu">
                        <li>
                        <a style={{ cursor: 'pointer' }}  className="buttonSair" onClick={() => alternar_estado(sair)}>
                            Sair
                        </a>
                    </li>
                    </ul>
                        <i className="logomarca"></i>
                        </a>
                    <div className="textbox">
                        <h2>
                            <strong>Olá, {respostaDoBackend.nome}! Receba o resultado de seus exames</strong>
                        </h2>
                        <p className="descricao">
                            Escolha a opção desejada para visualizar o resultado de seus exames.
                        </p>
                        <nav className='paciente'>
                            <ul>
                                <li><a href="/exams" className="buttonExames">
                            Seus exames</a></li>
                            </ul>
                        </nav>
                        </div>
                        </div>
                        </div>
                        <div className='container'>
                            <h2><strong>Conheça a nossa estrutura</strong></h2>
                            <div className='section'>
                                <img src={procape} alt="Pronto-Socorro Cardiológico Universitário de Pernambuco - Prof. Luiz Tavares" />
                                <img src={huoc} alt="Pronto-Socorro Cardiológico Universitário de Pernambuco - Prof. Luiz Tavares" />
                                <img src={cisam} alt="Pronto-Socorro Cardiológico Universitário de Pernambuco - Prof. Luiz Tavares" />
                            </div>
                </div>
                </body>
                </html>
            );
        }     
    }
}
  export default UserBox;
