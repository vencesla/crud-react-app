import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditUser() {
    const navigate = useNavigate();
    const { id } = useParams(); // Récupérer l'ID de l'URL
    const [inputs, setInputs] = useState({
      name: "",
      email: "",
      mobile: ""
    }); // Initialisation des valeurs du formulaire

    // Fonction pour récupérer les données de l'utilisateur à partir de l'ID
    useEffect(() => {
        getUser();
    }, [id]); // Appeler à chaque fois que l'ID change

    function getUser() {
        axios.get(`http://localhost:80/api/user/${id}/edit`)
        .then(function(response) {
            console.log(response.data);
            setInputs(response.data); // Mise à jour du formulaire avec les données
        }).catch(function(error) {
            console.error("Erreur lors de la récupération des données utilisateur", error);
        });
    }

    // Fonction de gestion des changements dans le formulaire
    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputs((values) => ({
            ...values, // Conserver les anciennes valeurs
            [name]: value // Mettre à jour seulement la clé qui a changé
        }));
    };

    // Fonction de gestion de la soumission du formulaire
    const handleSubmit = (event) => {
        event.preventDefault();

        axios.put(`http://localhost:80/api/user/${id}/edit`, inputs)
        .then(function(response) {
            console.log("Mise à jour réussie", response.data);
            navigate('/'); // Redirection après la mise à jour
        }).catch(function(error) {
            console.error("Erreur lors de la mise à jour de l'utilisateur", error);
        });
    };

    return (
        <div>
            <h1>Edit User</h1>
            <form onSubmit={handleSubmit}>
                <table align="center">
                    <tbody>
                        <tr>
                            <th><label>Name: </label></th>
                            <td>
                                <input
                                    type="text"
                                    name="name"
                                    value={inputs.name || ""}
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th><label>Email: </label></th>
                            <td>
                                <input
                                    type="email"
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
                                <button type="submit">Save</button> {/* Le bouton soumet le formulaire */}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
}