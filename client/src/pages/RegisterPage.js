import { useState } from 'react';
import axios from 'axios';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        repeat_password: ""
    });

    const { username, email, password, repeat_password } = formData;

    const onChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const onSubmit = async (event) => {
        event.preventDefault();

        if (password !== repeat_password) {
            console.log("Passwords do not match.");
        } else {
            const newUser = {
                username, email, password
            }

            try {
                const config = {
                    headers: {
                        "Content-Type": "application/json"
                    }
                };

                const body = JSON.stringify(newUser);

                const res = await axios.post("/api/users", body, config);
                console.log(res.data);


            } catch(err) {
                console.log(err.response.data);
            }
        }
    };

    return (
        <div>
            <h1>Rekisteröi uusi käyttäjä</h1>
            <form method="post" className="d-flex flex-column" style={{width: "220px"}} onSubmit={(event) => onSubmit(event)}>
                <input name="username" type="text" placeholder="Käyttäjänimi" value={username} onChange={(event) => onChange(event)} required />
                <input name="email" type="email" placeholder="Sähköposti" value={email} onChange={(event) => onChange(event)} required />
                <input name="password" type="password" placeholder="Salasana" value={password} onChange={(event) => onChange(event)} minLength="6" required />
                <input name="repeat_password" type="password" placeholder="Toista salasana" value={repeat_password} onChange={(event) => onChange(event)} minLength="6" required />

                <button type="submit">Rekisteröidy</button>
            </form>
        </div>
    );
};

export default RegisterPage;