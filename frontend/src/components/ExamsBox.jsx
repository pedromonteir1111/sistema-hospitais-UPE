import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ExamsBox.css';
import TableUser from './TableUser'; // Importe o componente TableUser

function ExamsBox() {
    const navigate = useNavigate();
    const [comandoSair, setComandoSair] = useState('');
    const [exames, setExames] = useState([]); // Estado para armazenar a lista de exames

    const logout = async () => {
        try {
            const resposta = await axios.post('http://localhost:4000/api/enviar-dados/logout', {
                mensagem: 'Quero sair',
            });
            setComandoSair(resposta.data);
            if (resposta.data.mensagem === 'Saia') {
                navigate('/login');
            }
        } catch (erro) {
            console.error('Erro ao enviar dados para o backend:', erro);
        }
    };

    useEffect(() => {
        lista();
    }, []);

    const lista = async () => {
        try {
            const resposta = await axios.post('http://localhost:4000/api/enviar-dados/user/exames/listar', {
                mensagem: 'Me dê os exames desse paciente',
            });
            setExames(resposta.data.mensagem); // Atualize o estado dos exames com a resposta do backend
        } catch (erro) {
            console.error('Erro ao enviar dados para o backend:', erro);
        }
    };

    const alternarEstado = () => {
        logout();
    };

    return (
      <div>
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
                          <a href="/user" className="logoleft">
                              <i className="logoupe"></i>
                          </a>
                          <ul className="lista">
                              <li>
                                  <a style={{ cursor: 'pointer' }} className="botaosair" onClick={alternarEstado}>
                                      Sair
                                  </a>
                              </li>
                          </ul>
                          <div className="clear"></div>
                          
                          {/* Conteúdo da lista de exames */}
                          <div className="exames-container">
                          <h2 className="exames-title">Lista de Exames</h2>
                          <div className="exames-list">
                              {/* Renderize o TableUser com a lista de exames */}
                              <TableUser data={exames} />
                          </div>
                      </div>
                      </div>
                  </div>
              </body>
          </html>
      </div>
  );
}

export default ExamsBox;
