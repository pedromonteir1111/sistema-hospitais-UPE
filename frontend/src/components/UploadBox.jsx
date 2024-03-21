import React, { useState } from 'react';
import axios from 'axios';
import './UploadBox.css';

function FazerUpload() {
    const [arquivoUsuario, setFile] = useState();

    function selecionarArquivo_FrontEnd(event) {
        console.log('Arquivo selecionado:', event.target.files[0]);
        setFile(event.target.files[0]);
    }

    async function Input_arquivoUsuario(event) {
        event.preventDefault();
        const url = 'http://localhost:4000/api/enviar-dados/uploader';
        const formData = new FormData();
       
        formData.append('file', arquivoUsuario);
        formData.append('fileName', arquivoUsuario.name);
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };
        try {
            var resposta_Foienviado = axios.post(url, formData, config);
            console.log("Arquivo enviado com sucesso!!!")
           
        
        } catch (error) {
            console.error('Erro ao enviar arquivo:', error);
            
        }
    }

    return (
        <div className="App">
            <form onSubmit={Input_arquivoUsuario}>
                <h1>ENVIO DE RESULTADOS</h1>
                <input type="file" onChange={selecionarArquivo_FrontEnd} />
                <button type="submit">ENVIAR</button>
            </form>
        </div>
    );
}

export default FazerUpload;




