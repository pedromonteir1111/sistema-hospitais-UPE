import React, { useState, useEffect} from 'react';
import logo from "./logo.png"
import {useNavigate} from 'react-router-dom';
import './ExamsBox.css'
import axios from 'axios';

function ExamsBox () {

    var sair = false;
    var mensagem = 'Quero saber o usuário';
    var mensagem_de_saida;
    const navigate = useNavigate();

    var [comando_sair, setComando_sair] = useState('');


    const logout = async () => {
        console.log('Função logout chamada');
        mensagem_de_saida = 'Quero sair';
      
        try {
          var resposta = await axios.post('http://localhost:4000/api/enviar-dados/logout', {
            mensagem: mensagem_de_saida,
          });
          
          console.log('Enviou')
          setComando_sair(resposta.data);
      
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



















    return (
        <html lang="pt-br" dir="ltr">
        <head>
          <meta charSet="utf-8" />
          <title>Site dos Hospitais UPE</title>
          <link rel="stylesheet" href="examestyles.css" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
            rel="stylesheet"
          />
        </head>
        <body>
          <div className="background">
            <div className="central">
              <a href="#" className="logoleft">
                <i className="logoupe"></i>
              </a>
              <ul className="lista">
                <li>
                    <a style={{ cursor: 'pointer' }} className="botaosair" onClick={() => alternar_estado(sair)}>
                    Sair
                  </a>
                </li>
              </ul>
              <div className="clear"></div>
              <div className="texto">
                <h2 className="tittle">
                  <strong>Status</strong>
                </h2>
                <p className="listado">Listado:</p>
                <a href="#" className="download">
                  Detalhes
                </a>
                <p className="pendente">Resultado pendente:</p>
                <a href="#" className="download">
                  Detalhes
                </a>
                <p className="pronto">Resultado pronto:</p>
                <a href="#" className="download">
                  Detalhes
                </a>
              </div>
            </div>
          </div>
        </body>
      </html>
    );
  };



export default ExamsBox;
