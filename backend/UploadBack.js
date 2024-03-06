const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

app.use(bodyParser.json());

// Rota para lidar com o upload do arquivo
app.post('/upload', (req, res) => {
    const { file, fileName } = req.body;
    const path_Arquivo = path.join(__dirname, 'ArquivosEnviados.json');
    // Criar um objeto com os dados do arquivo
    const fileData = { fileName, file };


    // ALTERAR DEPOIS!
    // JSON só está 'representando' os dados --------> fazer o Parse


    const jsonData = JSON.stringify(fileData);

    // Adicionando os dados do arquivo(do upload) ao arquivo "ArquivosEnviados.json" que está no nosso BACK
    fs.appendFileSync(path_Arquivo, jsonData + '\n');
    res.send('Arquivo enviado com sucesso e registrado no servidor!');
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});