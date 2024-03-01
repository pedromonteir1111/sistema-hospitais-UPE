import logo from "../logo.png"

//componente da caixa de login
function LoginBox(){
    return (
        <div className="screen">
            <div className="login-card">
                <img src={logo} alt="logo"/>
                
                <h1>Login</h1>
                <input name="username" placeholder="Nome"/>
                <input type="password" name="password" placeholder="Senha"/>

                <button className="login-btn">Entrar</button>
            </div>
        </div>
    );
}

export default LoginBox;