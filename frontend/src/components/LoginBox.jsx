import React, { useState } from 'react';
import logo from "../logo.png"
import { Link } from 'react-router-dom';
import './LoginBox.css'
import axios from 'axios';
import { useHistory } from 'react-router-dom';

//componente da caixa de login
function LoginBox() {
  var [respostaDoBackend, setRespostaDoBackend] = useState('');
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  // const history = useHistory();
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
      
    }
  }


  return (
    <div className="screen">
      <div className="login-card">
        <img src={logo} alt="logo" />
  
        <h1>Login</h1>
        
        <form onSubmit={enviarDadosParaBackend}>
        <input name="username" placeholder="Nome"
        onChange={(e) => setLogin(e.target.value)}
        value={login} 
        />
        <input type="password" name="password" placeholder="Senha" 
        onChange={(e) => setSenha(e.target.value)}
        value={senha}
        />

        <button type="submit" className="login-btn" onClick={Checar_cadastro}>
          Entrar
        </button>
        </form>
        {respostaDoBackend && (
          <p>{respostaDoBackend.mensagem}</p>
        )}

        <Link to="/register">
          <button className="register-btn">Criar conta</button>
        </Link>
      </div>
    </div>
  );
}

export default LoginBox;