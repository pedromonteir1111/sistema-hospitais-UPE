import React, { useState } from 'react';
import axios from 'axios';
import './UploadBox.css';

function FazerUpload() {
    const [arquivoUsuario, setFile] = useState();

    function selecionarArquivo_FrontEnd(event) {
        setFile(event.target.files[0]);
    }

    async function Input_arquivoUsuario(event) {
        event.preventDefault();
        const url = 'http://localhost:4000/api/enviar-dados/upload';
        const formData = new FormData();
        formData.append('file', arquivoUsuario);
        formData.append('fileName', arquivoUsuario.name);
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };
        try {
            const respostaFoienviado = await axios.post(url, formData, config);
            console.log(respostaFoienviado.data);
            console.log("Arquivo enviado com sucesso!!!")
            // Aqui você pode tratar a resposta, se necessário
        } catch (error) {
            console.error('Erro ao enviar arquivo:', error);
            console.log("Erro aoo enviar")
            // Aqui você pode tratar o erro, se necessário
        }
    }

    return (
        <div className="App">
            <form onSubmit={Input_arquivoUsuario}>
                <h1>React File Upload</h1>
                <input type="file" onChange={selecionarArquivo_FrontEnd} />
                <button type="submit">Upload</button>
            </form>
        </div>
    );
}

export default FazerUpload;



















// import React, { useState } from 'react';
// import axios from 'axios';
// import './UploadBox.css';

// function FazerUpload(){

// const [arquivoUsuario, setFile] = useState()  //arquivoUsuario armazenará o Arquivo

// function selecionarArquivo_FrontEnd(event) {  //funçao Atualiza a var arquivoUsuario com o arquivo selecionado no FrontEnd
//     setFile(event.target.files[0])       
// }

// function Input_arquivoUsuario(event) {
//     event.preventDefault()
//     const url = 'http://localhost:3000/uploadFile';
//     const formData = new FormData();
//     formData.append('file', arquivoUsuario);
//     formData.append('fileName', arquivoUsuario.name);
//     const config = {
//     headers: {
//         'content-type': 'multipart/form-data',
//     },
//     };
//     axios.post(url, formData, config).then((response) => {
//     console.log(response.data);
//     });

// }

// return (
//     <div className="App">
//         <form onSubmit={Input_arquivoUsuario}>
//         <h1>React File Upload</h1>
//         <input type="file" onChange={selecionarArquivo_FrontEnd}/>
//         <button type="submit">Upload</button>
//         </form>
//     </div>
// );
// }

// export default FazerUpload;



