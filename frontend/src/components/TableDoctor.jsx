import React from "react";
import './TableDoctor.css';

// tabela hibrida, ela mudara entre exibir os exames dos pacientes e listar os pacientes cadastrados
function TableDoctor () {
    return(
        <div>
            <div className="table">  
               {data.map((item, i) => (<div className="item">
                    <div className="head">{[item.name, item.text]}</div>
                    <div className="content">{item.numberrange}</div>
                </div>))
                }
            </div>
        </div>
    )
}

// dados aleatorios; serao substituidos por exames de pacientes
const data = [
    {
        "name": "Alika Myers",
        "numberrange": 9,
        "text": "a, scelerisque sed, sapien. Nunc pulvinar arcu et pede. Nunc"
    },
    {
        "name": "Ila Franco",
        "numberrange": "0",
        "text": "magna. Ut tincidunt orci quis lectus. Nullam suscipit, est ac"
    },
    {
        "name": "Darrel Sosa",
        "numberrange": 9,
        "text": "parturient montes, nascetur ridiculus mus. Aenean eget magna. Suspendisse tristique"
    },
    {
        "name": "Hannah Little",
        "numberrange": 5,
        "text": "Vestibulum accumsan neque et nunc. Quisque ornare tortor at risus."
    },
    {
        "name": "Rana Crane",
        "numberrange": 4,
        "text": "eget, venenatis a, magna. Lorem ipsum dolor sit amet, consectetuer"
    }
]

export default TableDoctor;