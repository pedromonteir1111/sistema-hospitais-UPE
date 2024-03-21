import React from 'react';
import axios from 'axios';

function FazerDownload(props) {
    const handleDownload = async () => {
        try {
            const resposta = await axios.post('http://localhost:4000/api/enviar-dados/user/exames/download', {
                caminho: props.lista // Envie o caminho do arquivo para o backend
            });
            // Se a requisição for bem-sucedida, o navegador irá iniciar o download automaticamente
        } catch (erro) {
            console.error('Erro ao enviar dados para o backend:', erro);
        }
    };

    return (
        <div>
            <button className="btn-login" onClick={handleDownload}>Baixar</button>
        </div>
    );
}

export default FazerDownload;
