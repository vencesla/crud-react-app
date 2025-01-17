import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function CreateUser() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((values) => ({
      ...values, // Conserver les anciennes valeurs
      [name]: value // Mettre à jour seulement la clé qui a changé
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post('http://localhost:80/api/user/save', inputs)
      .then(function(response) {
        console.log(response.data); // Assurez-vous que response.data est bien défini
        navigate('/');
      })
  };

  return (
    <div>
      <h1>Create User</h1>
      <form onSubmit={handleSubmit}>
        <table colSpan="10" align="center">
          <tbody>
            <tr>
              <th><label>Name: </label></th>
              <td>
                <input
                  type="text"
                  name="name"
                  value={inputs.name || ""} // Valeur contrôlée
                  onChange={handleChange} // Gestionnaire de changement
                />
              </td>
            </tr>
            <tr>
              <th><label>Email: </label></th>
              <td>
                <input
                  type="text"
                  name="email"
                  value={inputs.email || ""}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <th><label>Mobile: </label></th>
              <td>
                <input
                  type="text"
                  name="mobile"
                  value={inputs.mobile || ""}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td colSpan="2" align="right">
                <button type="submit">Save</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}
