import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, MapPin, Save, Loader, Pencil } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ProfileCard } from '../components/ProfileComponent/ProfileCard';
import { PersonalInfo } from '../components/ProfileComponent/PersonalInfo';
import './ProfilePage.css';
import { AddressSection } from '../components/ProfileComponent/AdressSection';
import { ActionButtons } from '../components/ProfileComponent/ActionButtons';

export default function ProfilePage() {
    const { user, isAuth, updatedUserInfo, loading } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        avatar: '',
        address: {
            street: '',
            city: '',
            state: '',
            zipCode: '',
            country: '',
        },
    });

    const [edit, setEdit] = useState(false);
    const [saved, SetSaved] = useState(false);

    useEffect(() => {
        if (!isAuth) {
            navigate('/');
        }
    }, [isAuth, navigate]);

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                avatar: user.avatar || '',
                address: {
                    street: user.address?.street || '',
                    city: user.address?.city || '',
                    state: user.address?.state || '',
                    zipCode: user.address?.zipCode || '',
                    country: user.address?.country || '',
                },
            });
        }
    }, [user]);

    const handleInputChange = e => {
        const { name, value } = e.target;

        if (name.startsWith('address.')) {
            const addressField = name.split('.')[1];
            setFormData(prev => ({
                ...prev,
                address: {
                    ...prev.address,
                    [addressField]: value,
                },
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async e => {
        e.preventDefault();

        if (loading) return;

        SetSaved(true);

        try {
            await updatedUserInfo({
                name: formData.name,
                avatar: formData.avatar,
                address: formData.address,
            });

            setEdit(false);
        } finally {
            SetSaved(false);
        }
    };

    const handleCancel = () => {
        setEdit(false);
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                avatar: user.avatar || '',
                address: {
                    street: user.address?.street || '',
                    city: user.address?.city || '',
                    state: user.address?.state || '',
                    zipCode: user.address?.zipCode || '',
                    country: user.address?.country || '',
                },
            });
        }
    };

    if (!user) return null;

    return (
        <div className="profile-page">
            <div className="profile-container">
                <h1 className="page-title">Mi Perfil</h1>

                <div className="profile-layout">
                    <ProfileCard user={user} navigate={navigate} />

                    <div className="profile-content">
                        <div className="profile-form-container">
                                <div className="form-header">                                    
                                    {!edit && (
                                        <button
                                            onClick={() => setEdit(true)}
                                            className="btn btn-outline"
                                        >
                                            <Pencil size={16} /> Editar Perfil
                                        </button>
                                    )}
                                    <br />
                                </div>

                            <form onSubmit={handleSubmit} className="profile-form">
                                <div className="form-content">
                                    <PersonalInfo
                                        formData={formData}
                                        handleInputChange={handleInputChange}
                                        isEditing={edit}
                                    />

                                    <AddressSection
                                        formData={formData}
                                        handleInputChange={handleInputChange}
                                        isEditing={edit}
                                    />

                                    <ActionButtons
                                        isEditing={edit}
                                        isSaving={saved}
                                        onCancel={handleCancel}
                                        onSubmit={handleSubmit}
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
