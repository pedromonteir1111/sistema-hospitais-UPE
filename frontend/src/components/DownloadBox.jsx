import React from 'react';
import axios from 'axios';

function FazerDownload(props) {
    const handleDownload = async () => {
        try {
            const resposta = await axios.post('http://localhost:4000/api/enviar-dados/user/exames/download', {
                caminho: props.lista 
            });

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
