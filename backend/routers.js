const express = require('express');
const cors = require('cors');
const fs = require('fs');
const bancodedados = 'banco_de_dados.json';
const app = express();
const bodyParser = require('body-parser');
const { log } = require('console');
const { PassThrough } = require('stream');
const port = 4000; 

app.use(cors()); // para permitir solicitações de qualquer origem
app.use(bodyParser.json());

app.post('/api/enviar-dados/registrar', (req, res) => {
    const novoPaciente = req.body;
    console.log('Dados recebidos do frontend:', novoPaciente);

    var resposta;
    fs.readFile(bancodedados, 'utf8', (err, dadosAtuais) => {
        if (err) {
          console.error('Erro ao ler o banco de dados', err);
          return;
        }
        const Dados_antigos = JSON.parse(dadosAtuais)
        const PacienteExistente = Dados_antigos.pacientes.find(pacientes => pacientes.email === novoPaciente.email) || Dados_antigos.pacientes.find(pacientes => pacientes.login === novoPaciente.login) ;

        if (PacienteExistente) {
            if(novoPaciente.email == "" || novoPaciente.cpf == "" || novoPaciente.login == "" || novoPaciente.date == "" || novoPaciente.senha == ""){
                resposta = { mensagem: 'Verifique se está faltando alguma informação' };
                console.log('Verifique se está faltando alguma informação');
                res.json(resposta);
            }
            else{
                resposta = { mensagem: 'Usuário já cadastrado' };
                console.log('Usuário já cadastrado');
                res.json(resposta);
            }

          } 
          
          else {
            Dados_antigos.pacientes.push(novoPaciente);
            resposta = { mensagem: 'Dados recebidos com sucesso!' };
            res.json(resposta);
        }

        const banco_atualizado = JSON.stringify(Dados_antigos, null, 2);
      
        fs.writeFile(bancodedados, banco_atualizado, 'utf8', (err) => {
          if (err) {
            console.error('Erro ao escrever no banco de dados', err);
            return;
          }
          console.log('Dados adicionados ao arquivo.');
        });
      });
    
  
  });





app.post('/api/enviar-dados/logar', (req, res) => {

const Login = req.body;

fs.readFile(bancodedados, 'utf8', (err, dadosAtuais) => {
    if (err) {
        console.error('Erro ao ler o banco de dados', err);
        return;
    }
    const Dados_antigos = JSON.parse(dadosAtuais)
    const PacienteExistente = Dados_antigos.pacientes.find(pacientes => pacientes.senha === Login.senha) && Dados_antigos.pacientes.find(pacientes => pacientes.login === Login.login) ;

    if (PacienteExistente) {
        if(Login.login == "" || Login.senha == ""){
            resposta = { mensagem: 'Verifique se está faltando alguma informação' };
            console.log('Verifique se está faltando alguma informação');
            res.json(resposta);
        }
        else{
            resposta = { mensagem: 'Login realizado' };
            console.log('Login realizado');
            res.json(resposta);
        }

        } 
        
        else {
        resposta = { mensagem: 'Conta não cadastrada!' };
        res.json(resposta);
    }

    
    
    


});


})









  app.listen(port, () => {
    console.log(`Servidor backend está rodando em http://localhost:${port}`);
  });