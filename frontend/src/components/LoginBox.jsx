import React, { useState } from 'react';
import logo from "../upe.jpg"
import { Link, useNavigate } from 'react-router-dom';
import './LoginBox.css'
import axios from 'axios';

//componente da caixa de login
function LoginBox() {
  var [respostaDoBackend, setRespostaDoBackend] = useState('');
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();
  
  const enviarDadosParaBackend = async (e) => {
    e.preventDefault(); 

    try {
      var resposta = await axios.post('http://localhost:4000/api/enviar-dados/logar', {
        
        login: login,
        senha: senha,

      });
      setRespostaDoBackend(resposta.data);
    } catch (erro) {
      console.error('Erro ao enviar dados para o backend:', erro);
    }
  };

  const Checar_cadastro = () => {
    if (respostaDoBackend.mensagem === 'Login realizado') {
      alert('Login realizado com sucesso!');
      // history.push('/home');
      navigate('/user');
      
    }
  }

  Checar_cadastro();
  return (
    <div className='fundo-login'>
      <div className="login-form-wrap">
        <div className="container">
        <img src={logo} alt="Logo"/>
        </div>
        <h2 className = 'texto-login'>Acessar Sistema</h2>
        <div>     
          <form className = 'login-form' onSubmit={enviarDadosParaBackend}>
          <input name="username" placeholder="Nome" required
          onChange={(e) => setLogin(e.target.value)}
          value={login} 
          />
          <input type="password" name="password" placeholder="Senha" 
          onChange={(e) => setSenha(e.target.value)}
          value={senha}
          />

          <button type="submit" className="btn-login">
            Entrar
          </button>
          </form>
          {respostaDoBackend && (
            <p>{respostaDoBackend.mensagem}</p>
          )}

          <Link to="/register">
            <button className="btn-register">Criar conta</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginBox;