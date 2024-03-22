const express = require('express');
const cors = require('cors');
const fs = require('fs');
const bancodedados = 'banco_de_dados.json';
const app = express();
const bodyParser = require('body-parser');
const path = require('path')
const multer = require('multer')
const port = 4000; 

var nome;
var nome_inicial;
var medico;
var UsuarioExistente = false;
var resposta_de_login;
var resposta_de_registro;
var resposta_de_user;
var random_id;
var lista_ids = [];
var lista_ids_dos_pacientes = []
var medico_que_esta_logado;
var login


app.use(cors()); // para permitir solicitações de qualquer origem
app.use(bodyParser.json());

app.post('/api/enviar-dados/registrar', (req, res) => {
    var novoUsuario = req.body;
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
            lista_ids = []
            random_id = Math.floor(Math.random() * 100000000);
            console.log(random_id)
            for(let paciente in Dados_antigos.usuarios){
              lista_ids.push(Dados_antigos.usuarios[paciente].p_id)
              if(Dados_antigos.usuarios[paciente].p_id == random_id || lista_ids.includes(random_id)){
                random_id = Math.floor(Math.random() * 100000000);
              }

            }
            console.log("usuário antes:", novoUsuario)
            novoUsuario.p_id = random_id
            console.log(novoUsuario)
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
      
      
      for(let indice_dos_dados in Dados_antigos.usuarios){
        if(Dados_antigos.usuarios[indice_dos_dados].senha == Login.senha && Dados_antigos.usuarios[indice_dos_dados].login == Login.login){
          UsuarioExistente = true;
          nome = Dados_antigos.usuarios[indice_dos_dados].nome;
          medico = Dados_antigos.usuarios[indice_dos_dados].medico;
          login = Dados_antigos.usuarios[indice_dos_dados].login;
          if(medico == true){
            lista_ids_dos_pacientes = Dados_antigos.usuarios[indice_dos_dados].pacientes
            medico_que_esta_logado = Dados_antigos.usuarios[indice_dos_dados].id

          }
          console.log(Dados_antigos.usuarios[indice_dos_dados])
          // console.log(nome)
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
      resposta_de_user = {nome: nome_inicial, isMedico: medico, mensagem: 'Login feito'};
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
  // console.log('Requisição recebida em /api/enviar-dados/logout:', req.body)
  if(requisicao.mensagem === 'Quero sair'){
    res.json({mensagem: 'Saia'});
    console.log('O usuário pediu pra sair')
    nome = ''
    nome_inicial = ' '
    resposta_de_login.mensagem = ''
    UsuarioExistente = false
  }
  else{
    res.json({mensagem: 'Não saia'});
  }


})

const upload = multer({ dest: 'Arquivos_Enviados_Upload/' });

app.post('/api/enviar-dados/uploader', upload.single('file'), (req, res) => {
  const ID_arquivo = req.file; 
  const Nome_arquivo = req.body.fileName; 

  
  if (!ID_arquivo || !Nome_arquivo) {
      console.log('Dados Não recebidos');
      return res.status(400).send('Dados do arquivo ausentes ou inválidos');
  }

  
  const Path_arquivo = path.join(__dirname, 'Arquivos_Enviados_Upload', Nome_arquivo);

  fs.rename(ID_arquivo.path, Path_arquivo, (err) => {
      if (err) {
          console.log("Erro ao salvar arquivo:", err);
          return res.status(500).send('Erro ao salvar o arquivo');
      }
      console.log("Arquivo salvo com sucesso em:", Path_arquivo);
      res.send('Arquivo enviado e salvo com sucesso');
  });
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
    var requisicao = req.body;
       
    if(requisicao.mensagem === 'Quero os pacientes'){
      fs.readFile(bancodedados, 'utf8', (err, datastr) => {
        if (err) {
          console.error('Erro ao ler o banco de dados', err);
          return;
        }
        const data = JSON.parse(datastr);
        const pacientes = data.usuarios.filter(usuario => !usuario.medico && usuario.nome && lista_ids_dos_pacientes.includes(usuario.p_id))
        res.json(pacientes.map((paciente) => {return {name: paciente.nome, text: paciente.cpf,}}));
      })
    }
  })

  app.post('/api/enviar-dados/user/medico/pacientes/vincular', (req, res) => {
    var requisicao = req.body;
  
    if (requisicao.mensagem === 'Quero vincular um paciente') {
      fs.readFile(bancodedados, 'utf8', (err, datastr) => {
        if (err) {
          console.error('Erro ao ler o banco de dados', err);
          res.status(500).json({ mensagem: 'Erro ao ler o banco de dados' });
          return;
        }
  
        var data = JSON.parse(datastr);
        for (let user in data.usuarios) {
          if (data.usuarios[user].id == medico_que_esta_logado) {
            for (let i in data.usuarios) {
              try{
              if (data.usuarios[i].cpf == requisicao.cpf) {
                if(!data.usuarios[user].pacientes.includes(data.usuarios[i].p_id))
                  data.usuarios[user].pacientes.push(data.usuarios[i].p_id);
          
              }
            }
            catch{

            }
            }
          }
        }
        
        const banco_atualizado = JSON.stringify(data, null, 2);

        fs.writeFile(bancodedados, banco_atualizado, 'utf8', (err) => {
          if (err) {
            console.error('Erro ao escrever no banco de dados', err);
            res.status(500).json({ mensagem: 'Erro ao escrever no banco de dados' });
            return;
          }
          console.log('Dados adicionados ao arquivo.');
          // console.log(nome)
          res.json({ mensagem: 'Vinculei' });
        });
      });
    }
  });

app.get("/download", (req, res) => {
  res.download(__dirname + '/Arquivos_Enviados_Upload/backLinkedIn.jpg');
})




app.post('/api/enviar-dados/user/exames/listar', (req, res) => {
  var requisicao = req.body;

  var exames_por_usuario = [];
     
  const diretorio = './Arquivos_Enviados_Upload';

  
  fs.readdir(diretorio, (err, files) => {
      if (err) {
          console.error('Erro ao ler o diretório:', err);
          res.status(500).json({ mensagem: 'Erro ao ler o diretório' });
          return;
      }

      
      var apenasArquivos = files.filter(file => fs.statSync(`${diretorio}/${file}`).isFile());
      // console.log(apenasArquivos)

      
      fs.readFile(bancodedados, 'utf8', (err, datastr) => {
          if (err) {
              console.error('Erro ao ler o banco de dados', err);
              res.status(500).json({ mensagem: 'Erro ao ler o banco de dados' });
              return;
          }

          const data = JSON.parse(datastr);

          
          for (let i = 0; i < apenasArquivos.length; i++) {
              for (let j = 0; j < data.usuarios.length; j++) {
                  if (data.usuarios[j].login === login && apenasArquivos[i].includes(data.usuarios[j].cpf)) {
                      exames_por_usuario.push(apenasArquivos[i]);
                  }
              }
          }

          // console.log('Arquivos encontrados:', exames_por_usuario);
          res.json({mensagem: exames_por_usuario})

      });
  });
});


app.post('/api/enviar-dados/user/exames/download', (req, res) => {
    const diretorio = './Arquivos_Enviados_Upload';
    const caminho = req.body.caminho;

    
    const arquivoPath = path.join(diretorio, caminho);
    if (!fs.existsSync(arquivoPath)) {
        return res.status(404).json({ mensagem: 'Arquivo não encontrado' });
    }

    
    res.download(arquivoPath);
});
