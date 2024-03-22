import React, { useState } from "react";
import './TableUser.css'; 
import FazerDownload from "./DownloadBox";

function TableUser(props) {
    const [opened, setOpened] = useState(null);

    function toggle(i){
        if(opened === i){
            setOpened(null);
        } else {
            setOpened(i)
        }
    }
    console.log(props.data)
    return (
        <div>
            <div className="table">  
               {props.data.map((item, i) => (
                   <div className="item" key={i}>
                       <div className="head" onClick={() => {toggle(i)}}>
                           <h1>{item}</h1><span>{opened === i ? '-' : '+'}</span>
                       </div>
                       <div className={opened === i ? 'content-show2' : 'content'}>
                           <div className="download">{<FazerDownload lista={item} urlDoArquivo = {".../backend/Arquivos_Enviados_Upload"}/>}</div>
                       </div>
                   </div>
               ))}
            </div>
        </div>
    );
}

export default TableUser;
