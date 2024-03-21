import React, { useState } from 'react';
import axios from 'axios';
import './DownloadBox.css';



function FazerDownload(props) {
    const handleDownload = () => {
        // URL do arquivo a ser baixado
        const arquivoUrl = props.urlDoArquivo;
        // Nome do arquivo a ser baixado
        const nomeArquivo = props.lista;

        // Criando um link <a> temporário para realizar o download
        const linkDownload = document.createElement('a');
        linkDownload.href = arquivoUrl;
        linkDownload.download = nomeArquivo;

        // Clicando automaticamente no link para iniciar o download
        linkDownload.click();
    };

    return (
        <div>
            <button className="btn-login" onClick={handleDownload}>Baixar</button>
        </div>
    );
}

export default FazerDownload;