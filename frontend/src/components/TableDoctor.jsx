import React, { useState } from "react";
import FazerUpload from './UploadBox'
import './TableDoctor.css';

// tabela hibrida, ela mudara entre exibir os exames dos pacientes e listar os pacientes cadastrados
function TableDoctor (props) {
    
    const [opened, setOpened] = useState(null);

    function toggle(i){
        if(opened == i){
            setOpened(null);
        } else {
            setOpened(i)
        }
    }
    
    return(
        <div>
            <div className="table">  
               {props.data.map((item, i) => (<div className="item">
                    <div className="head" onClick={() => {toggle(i)}}>
                        <h1>{item.name}</h1><span>{opened === i ? '-' : '+'}</span>
                    </div>
                    <div className={opened === i ? 'content-show' : 'content'}>
                        <p>{props.type === 'pacientes' ? item.text : ''}</p>
                        <div className="upload">{props.type === 'exames' && <FazerUpload cpf={item.text}/>}</div>
                    </div>
                </div>))
                }
            </div>
        </div>
    )
}

export default TableDoctor;