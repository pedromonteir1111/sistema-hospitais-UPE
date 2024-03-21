import React, { useState } from 'react';
import axios from 'axios';
import logo from './upe.jpg';
import './RegisterBox.css';
import { Link, useNavigate } from 'react-router-dom';



function RegisterBox() {
  var [respostaDoBackend, setRespostaDoBackend] = useState('');
  const [cpf, setCPF] = useState('');
  const [data, setData] = useState('');
  const [senha, setSenha] = useState('');
  const [email, setEmail] = useState('');
  const [login, setLogin] = useState('');
  const [nome, setNome] = useState('');
  // const [medico, setMedico] = useState('');
  const navigate = useNavigate();

  const enviarDadosParaBackend = async (e) => {
    e.preventDefault(); 

    try {
      var resposta = await axios.post('http://localhost:4000/api/enviar-dados/registrar', {
        
        email: email,
        login: login,
        cpf: cpf,
        date: data,
        senha: senha,
        nome: nome,
        medico: false,
      });
      setRespostaDoBackend(resposta.data);
    } catch (erro) {
      console.error('Erro ao enviar dados para o backend:', erro);
    }
  };
  
  
  
  const exibirMensagem = () => {
    if (respostaDoBackend.mensagem === 'Dados recebidos com sucesso!') {
      alert('Cadastro realizado com sucesso!');
      // window.location.href = '/login'
      navigate('/login');

    }
    
  };
  
  exibirMensagem();

  return (
    <div className="screen">
      <div className="login-form">
        <div className='logo'>
        <img src={logo} alt="logo" />
        </div>
        <h1 className='h1cadastrar'>Cadastrar Paciente</h1>
        <form onSubmit={enviarDadosParaBackend}>
          

        <input
            type="email"
            name="email"
            placeholder="E-mail"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
            <input
            type='text'
            name="nome"
            placeholder="Nome completo"
            onChange={(e) => setNome(e.target.value)}
            value={nome}
          />
          <input
            type='text'
            name="login"
            placeholder="Login"
            onChange={(e) => setLogin(e.target.value)}
            value={login}
          />
          
          <input
            type="text"
            name="cpf"
            placeholder="CPF"
            onChange={(e) => setCPF(e.target.value)}
            value={cpf}
          />
          <input
            type="date"
            name="data"
            placeholder="Data de Nascimento"
            onChange={(e) => setData(e.target.value)}
            value={data}
          />
          <input
            type="password"
            name="senha"
            placeholder="Senha"
            onChange={(e) => setSenha(e.target.value)}
            value={senha}
          />


          <button type="submit" className="register-btn">
            Registrar
          </button>
        </form>
        {respostaDoBackend && (
          <p>{respostaDoBackend.mensagem}</p>
        )}
        
      </div>
    </div>
  );
}

export default RegisterBox;
