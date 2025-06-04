import React, {useState} from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
    const [values, setValues] = useState({
        email: "",
        password: ""
    })

    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Enviando login com dados:", values);
    
        axios.post('http://localhost:8800/login', values)
            .then(res => {
                console.log("Resposta do backend:", res.data);
    
                if (res.data.Status === "Success") {
                    navigate("/");
                } else {
                    alert(res.data.Error);
                }
            })
            .catch(err => {
                console.log("Erro na requisição axios:", err);
                alert("Erro na requisição ao servidor.");
            });
    
        }; 

    return (
    <div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
        <label>
            E-mail:<br />
            <input type="email" name="email" onChange={e => setValues({...values, email: e.target.value})} required />
        </label><br /><br />

        <label>
            Senha:<br />
            <input type="password" name="password" onChange={e => setValues({...values, password: e.target.value})} required />
        </label><br /><br />

        <button type="submit">Entrar</button>
        <Link to="/cadastro">Cadastrar</Link>
        </form>
    </div>
    );
}

export default Login;


