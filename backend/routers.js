const express = require('express');
const cors = require('cors');
const fs = require('fs');
const bancodedados = 'banco_de_dados.json';
const app = express();
const bodyParser = require('body-parser');
const { log } = require('console');
const { PassThrough } = require('stream');
const port = 4000; 

var nome;
var nome_inicial;
var medico;
var UsuarioExistente = false;
var resposta_de_login;
var resposta_de_registro;
var resposta_de_user;

app.use(cors()); // para permitir solicitações de qualquer origem
app.use(bodyParser.json());

app.post('/api/enviar-dados/registrar', (req, res) => {
    const novoUsuario = req.body;
    nome = ""
    console.log('Dados recebidos do frontend:', novoUsuario);

    resposta_de_registro;
    fs.readFile(bancodedados, 'utf8', (err, dadosAtuais) => {
        if (err) {
          console.error('Erro ao ler o banco de dados', err);
          return;
        }
        const Dados_antigos = JSON.parse(dadosAtuais)
        const UsuarioExistente = Dados_antigos.usuarios.find(usuarios => usuarios.email === novoUsuario.email) || Dados_antigos.usuarios.find(usuarios => usuarios.login === novoUsuario.login) ;

        if (UsuarioExistente) {
            if(novoUsuario.email == "" || novoUsuario.cpf == "" || novoUsuario.login == "" || novoUsuario.date == "" || novoUsuario.senha == ""){
                resposta_de_registro = { mensagem: 'Verifique se está faltando alguma informação' };
                console.log('Verifique se está faltando alguma informação');
                res.json(resposta_de_registro);
            }
            else{
                resposta_de_registro = { mensagem: 'Usuário já cadastrado' };
                console.log('Usuário já cadastrado');
                res.json(resposta_de_registro);
            }

          } 
          
          else {
            Dados_antigos.usuarios.push(novoUsuario);
            resposta_de_registro = { mensagem: 'Dados recebidos com sucesso!' };
            res.json(resposta_de_registro);
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
      // const UsuarioExistente = Dados_antigos.usuarios.find(usuarios => usuarios.senha === Login.senha) && Dados_antigos.usuarios.find(usuarios => usuarios.login === Login.login) ;
      
      for(let indice_dos_dados in Dados_antigos.usuarios){
        if(Dados_antigos.usuarios[indice_dos_dados].senha == Login.senha && Dados_antigos.usuarios[indice_dos_dados].login == Login.login){
          UsuarioExistente = true;
          nome = Dados_antigos.usuarios[indice_dos_dados].nome;
          medico = Dados_antigos.usuarios[indice_dos_dados].medico;
          console.log(Dados_antigos.usuarios[indice_dos_dados])
          console.log(nome)
          try{
            nome_inicial = nome.split(" ")[0];
          }
          catch{

          }
        }

      }

      if (UsuarioExistente) {
          if(Login.login == "" || Login.senha == ""){
              resposta_de_login = { mensagem: 'Verifique se está faltando alguma informação' };
              console.log('Verifique se está faltando alguma informação');
              res.json(resposta_de_login);
          }
          else{
            resposta_de_login = { mensagem: 'Login realizado' };
            console.log('Login realizado');
            res.json(resposta_de_login);             
          }

          } 
          
          else {
          resposta_de_login = { mensagem: 'Conta não cadastrada!' };
          res.json(resposta_de_login);
      }
  });
})

app.post('/api/enviar-dados/user', (req, res) => {
  const requisicao = req.body;
  
  if(resposta_de_login.mensagem == 'Login realizado'){
    
    if(requisicao.mensagem == 'Quero saber o usuário'){
      resposta_de_user = {nome: nome_inicial, isMedico: medico, mensagem: 'Login feito' };
      console.log(`O usuário ${nome} fez login`);
      res.json(resposta_de_user);
    }
}
  else{
    resposta_de_user = {mensagem: 'Login negado' };
    res.json(resposta_de_user);
  }

})

app.post('/api/enviar-dados/logout', (req, res) => {
  const requisicao = req.body;
  console.log('Requisição recebida em /api/enviar-dados/logout:', req.body)
  if(requisicao.mensagem === 'Quero sair'){
    res.json({mensagem: 'Saia'});
    console.log('O usuário pediu pra sair')
    // nome = ''
    resposta_de_login.mensagem = ''
  }
  else{
    res.json({mensagem: 'Não saia'});
  }


})

app.post('/api/enviar-dados/upload', (req, res) => {
  const file = req.body.file;
  const fileName = req.body.fileName;
  
  const filePath = path.join(__dirname, 'ArquivosEnviados.json');
  const fileData = { fileName, file };
  const jsonData = JSON.stringify(fileData);
  fs.appendFileSync(filePath, jsonData + '\n');
  res.send('Arquivo enviado com sucesso e registrado no servidor!');

});

  app.listen(port, () => {
    console.log(`Servidor backend está rodando em http://localhost:${port}`);
  });
  
  app.post('/api/enviar-dados/user/medico/exames', (req, res) => {
    const requisicao = req.body;
       
    if(requisicao.mensagem === 'Quero os exames'){
      fs.readFile(bancodedados, 'utf8', (err, datastr) => {
        if (err) {
          console.error('Erro ao ler o banco de dados', err);
          return;
        }
        const data = JSON.parse(datastr);
        console.log(data.exames);
        res.json(data.exames);
      })
    }
  })

  app.post('/api/enviar-dados/user/medico/pacientes', (req, res) => {
    const requisicao = req.body;
       
    if(requisicao.mensagem === 'Quero os pacientes'){
      fs.readFile(bancodedados, 'utf8', (err, datastr) => {
        if (err) {
          console.error('Erro ao ler o banco de dados', err);
          return;
        }
        const data = JSON.parse(datastr);
        const pacientes = data.usuarios.filter(usuario => !usuario.medico && usuario.nome)
        console.log(pacientes.map((paciente) => {return {name: paciente.nome, text: paciente.cpf}}));
        res.json(pacientes.map((paciente) => {return {name: paciente.nome, text: paciente.cpf,}}));
      })
    }
  })