import { useState } from 'react';
import axios from 'axios';

const LoginPage = () => {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    const submit = async (event) => {
        event.preventDefault();

        try {
            await axios.post("http://localhost:5000/api/login", {
                username, password
            })
            .then((res) => {

            })
            .catch((err) => {
                alert("Wrong credentials");
            });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <h1>Kirjaudu sisään</h1>
            <form method="post" className="d-flex flex-column" style={{width: "220px"}}>
                <input name="username" type="text" placeholder="Käyttäjänimi" onChange={(event) => {
                    setUsername(event.target.value);
                    console.log(username);
                }} />

                <input name="password" type="password" placeholder="Salasana" onChange={(event) => {
                    setPassword(event.target.value);
                }} />

                <button type="submit" onClick={submit}>Kirjaudu</button>
            </form>
        </div>
    );
};

export default LoginPage;