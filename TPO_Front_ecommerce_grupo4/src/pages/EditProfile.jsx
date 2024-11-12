import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { getUserProfile, editUserProfile } from '../services/profileService'; // Asegúrate de que estas funciones existan
import { useAuth } from '../hooks/useAuth';
import './EditProfile.css'; // Asegúrate de tener estilos si es necesario

const EditProfile = () => {
    const { user } = useAuth();
    const userId = user?.id;
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            if (!userId) return;

            try {
                const profileData = await getUserProfile(userId);
                setUserData(profileData);
            } catch (error) {
                console.error("Error al obtener los datos del usuario:", error);
            }
        };

        fetchUserData();
    }, [userId]);

    const handleSubmit = async (values) => {
        try {
            await editUserProfile({ id: userId, ...values });
            alert("Perfil actualizado con éxito");
            navigate('/profile'); // Redirige a la página de perfil después de la edición
        } catch (error) {
            console.error("Error al actualizar el perfil:", error);
            alert("Ocurrió un error al actualizar el perfil.");
        }
    };

    const validationSchema = Yup.object().shape({
        firstName: Yup.string()
            .required("El nombre es obligatorio.")
            .min(2, "El nombre debe tener al menos 2 caracteres."),
        lastName: Yup.string()
            .required("El apellido es obligatorio.")
            .min(2, "El apellido debe tener al menos 2 caracteres."),
        email: Yup.string()
            .required("El correo electrónico es obligatorio.")
            .email("Ingrese un correo electrónico válido."),
    });

    return (
        <div className="edit-profile-container">
            <h1>Editar Perfil</h1>
            {userData ? (
                <Formik
                    initialValues={{
                        firstName: userData.firstName || '',
                        lastName: userData.lastName || '',
                        email: userData.email || '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ errors, touched }) => (
                        <Form>
                            <div>
                                <label>Nombre</label>
                                <Field name="firstName" />
                                <ErrorMessage name="firstName" component="div" className="text-danger" />
                            </div>
                            <div>
                                <label>Apellido</label>
                                <Field name="lastName" />
                                <ErrorMessage name="lastName" component="div" className="text-danger" />
                            </div>
                            <div>
                                <label>Email</label>
                                <Field name="email" type="email" />
                                <ErrorMessage name="email" component="div" className="text-danger" />
                            </div>
                            <button type="submit">Guardar Cambios</button>
                        </Form>
                    )}
                </Formik>
            ) : (
                <p>Cargando datos del usuario...</p>
            )}
        </div>
    );
};

export default EditProfile;