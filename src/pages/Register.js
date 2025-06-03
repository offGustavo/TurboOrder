import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: ""
    })

    const navigate = useNavigate();

    const handleSubmit = ( event ) => {
        event.preventDefault();
        axios.post('http://localhost:8800/cadastro', values)
        .then(res => {
            if(res.data.Status === "Success" ) {
                navigate("/login")
            } else {
                alert("Error")
            }
        })
        .catch(err => console.log(err))
    }

    return (
    <div>
        <h2>Registro de Usuário</h2>
        <form onSubmit={handleSubmit}>
        <label>
            Nome:<br />
            <input type="text" name="nome" onChange={e => setValues({...values, username: e.target.value})} required />
        </label><br /><br />

        <label>
            E-mail:<br />
            <input type="email" name="email" onChange={e => setValues({...values, email: e.target.value})} required />
        </label><br /><br />

        <label>
            Senha:<br />
            <input type="password" name="senha" onChange={e => setValues({...values, password: e.target.value})} required />
        </label><br /><br />

        <button type="submit">Registrar</button>
        <Link to="/login">Entrar</Link>
        </form>
    </div>
    );
}

export default Register;