import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './HomeBox.css';

function HomeBox() {
    return (
        <div>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
            <section className="main">
            <div className="layer"></div>
            <div className="center">
                <header>
                <div className="icons-social">
                    <a href="https://www.facebook.com/universidadepernambuco?locale=pt_BR"><i className="fa-brands fa-facebook-f"></i></a>
                    <a href="https://www.instagram.com/huoc.upe.oficial/?hl=pt-pt"><i className="fa-brands fa-instagram"></i></a>
                </div>
                {/* icons-social */}
                <div className="clear"></div>
                <div className="logo">MediConnectPE</div>
                <nav className="desktop">
                    <ul className='lista-links'>
                    <li><a href="https://upe.br/uh-huoc.html">HUOC</a></li>
                    <li><a href="https://upe.br/uh-procape.html">PROCAPE</a></li>
                    <li><a href="https://upe.br/uh-cisam.html">CISAM</a></li>
                    </ul>
                </nav>
                <div className="clear"></div>
                </header>
                <div className="conteudo-header">
                <h2>
                    Seus Resultados <span>na ponta dos dedos.</span>
                </h2>
                <p>
                    Bem-vindo(a) a nossa plataforma de saúde dedicada a simplificar o
                    acesso aos resultados dos seus exames médicos. Oferecemos uma
                    experiência rápida, segura e eficiente, colocando você no controle
                    da sua saúde. Desfrute de benefícios como visualização fácil dos
                    resultados, orientações personalizadas e conexão direta com
                    profissionais de saúde. Sua segurança é nossa prioridade, garantindo
                    a proteção dos seus dados.
                </p>
                <p>
                    Juntos, podemos transformar a maneira como você interage com seus
                    resultados de exames, tornando a experiência mais transparente,
                    colaborativa e centrada no paciente. Faça login e comece a sua
                    jornada rumo a uma saúde mais conectada e inteligente. Estamos aqui
                    para cuidar de você!
                </p>
                <a href="/login">Login</a>
                </div>
                {/* conteudo-header */}
                </div>
                {/* center */}
                </section>
                

                <section className="mapas">
                <div className="naosei"></div>
                <div className="frase-mapas">
                    <h2>Como chegar em nossas unidades:</h2>
                </div>
                <section className="box-mapas">
                    <div className="center">
                    <div className="box-mapas-single">
                        <div className="box-mapas-wraper">
                        <div className="mapinha">
                            <h2>HUOC</h2>
                            <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3950.5265836080007!2d-34.89026012544197!3d-8.047643680380494!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7ab18f272181369%3A0x205965a491ccc6b5!2sHospital%20Oswaldo%20Cruz!5e0!3m2!1spt-BR!2sbr!4v1709794941987!5m2!1spt-BR!2sbr"
                            width="342"
                            height="350"
                            style={{ border: 0 }}
                            allowfullscreen=""
                            loading="lazy"
                            referrerpolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                        </div>
                        {/* box-mapas-wraper */}
                    </div>
                    {/* box-mapas-single */}
                    <div className="box-mapas-single">
                        <div className="box-mapas-wraper">
                        <div className="mapinha">
                            <h2>PROCAPE</h2>
                            <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3950.5121600323373!2d-34.889824825441934!3d-8.04912308039843!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7ab18edaa04d667%3A0x63571c64fc754d0c!2sPROCAPE!5e0!3m2!1spt-BR!2sbr!4v1709655246386!5m2!1spt-BR!2sbr"
                            width= "40%"
                            height="40%"
                            style={{ border: 0 }}
                            allowfullscreen=""
                            loading="lazy"
                            referrerpolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                        </div>
                        {/* box-mapas-wraper */}
                    </div>
                    {/* box-mapas-single */}
                    <div className="box-mapas-single">
                        <div className="box-mapas-wraper">
                        <div className="mapinha">
                            <h2>CISAM</h2>
                            <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3950.622800182033!2d-34.887703!3d-8.037768!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7ab19a1a11f9d5f%3A0x991175430ca700c2!2sCISAM-UPE-%20Unidade%20Ambulatorial!5e0!3m2!1spt-BR!2sbr!4v1709795474477!5m2!1spt-BR!2sbr"
                            width="320"
                            height="350"
                            style={{ border: 0 }}
                            allowfullscreen=""
                            loading="lazy"
                            referrerpolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                        </div>
                        {/* box-mapas-wraper */}
                    </div>
                    {/* box-mapas-single */}
                    </div>
                    {/* center */}
            </section>
            {/* box-mapas */}
            </section>

            <section className="parallax">
                <div className="overlay-parallax"></div>
                <div className="center">
                <h2>
                    Conheça nosso <span style={{ color: 'rgb(56, 222, 237)' }}>COMPLEXO HOSPITALAR</span>
                </h2>
                <p>
                    Inaugurado em 2012, o Complexo Hospitalar é parte integrante da Reitoria e é composto pelo Conselho de Administração do Complexo Hospitalar, Superintendência e Unidades Hospitalares (CISAM, HUOC e PROCAPE). Sua missão é fortalecer os Hospitais Universitários do Campus Santo Amaro da Universidade de Pernambuco (UPE) como um hub colaborativo para a formação profissional e um importante centro de atendimento na Rede Estadual de Saúde.
                </p>
                <p>
                    “Formar recursos humanos, gerar conhecimento e prestar assistência em saúde, em nível de excelência para as regiões Norte e Nordeste, contribuindo para o exercício da cidadania” - missão HUOC
                </p>
                <p>
                    “Prestar assistência aos usuários do Sistema Único de Saúde na área de alta complexidade nas doenças cardiovasculares e promover o ensino, a pesquisa e a extensão” - missão PROCAPE
                </p>
                <p>
                    “Desenvolver ações de atenção integral à saúde da população, nos preceitos da Humanização, servindo de campo de ensino, pesquisa e extensão, integrado ao Sistema Único de Saúde–SUS” - missão CISAM
                </p>
                </div>
            </section>

            <section className="final-section">

                <div className="w50contato">
                    <h2>Alguma dúvida? Fale conosco!</h2>
                    <form>
                    <input type="text" placeholder="Insira seu nome" />
                    <input type="email" placeholder="Insira seu e-mail" />
                    <textarea placeholder="Insira sua mensagem"></textarea>
                    <input type="submit" value="Enviar!" />
                    </form>
                </div>
                <div className="w50noticia">
                    <h2>Fique por dentro!</h2>
                    <div className="w50 noticia-single">
                    <div className="topo-box-noticia">
                        <div className="manchete">
                        <p style={{ fontWeight: 'bold' }}>Hospital Regional Jesus Nazareno acolhe novos residentes da unidade</p>
                        </div>
                    </div>
                    {/* topo-box-noticia */}
                    <div className="descricao">
                        <p>
                        04.03.2024 Acolhimento dos seis novos residentes de Enfermagem Obstétrica ESPPE e de Ginecologia e Obstetrícia da UFPE.
                        </p>
                    </div>
                    {/* descricao */}
                    </div>

                    <div className="w50 noticia-single">
                    <div className="topo-box-noticia">
                        <div className="manchete">
                        <p style={{ fontWeight: 'bold' }}>VI Geres se reúne com municípios para fortalecimento das coberturas vacinais</p>
                        </div>
                    </div>
                    {/* topo-box-noticia */}
                    <div className="descricao">
                        <p>
                        01.03.2024 Ação visa fortalecer cobertura vacinal nas cidades de Manarí, Pedra, Venturosa, Arcoverde, Jatobá...
                        </p>
                    </div>
                    {/* descricao */}
                    </div>

                    <div className="clear"></div>
                </div>
                <div className="clear"></div>
            
            </section>
        </div>




    )
} 
export default HomeBox; 