import React, { useState } from "react";
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
               {props.data.map((item, i) => (<div className="item" onClick={() => {toggle(i)}}>
                    <div className="head">
                        <h1>{item.name}</h1><span>{opened === i ? '-' : '+'}</span>
                    </div>
                    <div className={opened === i ? 'content-show' : 'content'}><p>{item.text}</p></div>
                </div>))
                }
            </div>
        </div>
    )
}

export default TableDoctor;