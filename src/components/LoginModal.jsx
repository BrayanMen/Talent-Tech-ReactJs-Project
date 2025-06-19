import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import toast from './ui/Toast';
import { Eye, EyeClosed, X } from 'lucide-react';
import './LoginModal.css';

export default function LoginModal({ onClose }) {
    const [isLogin, setIsLogin] = useState(true);
    const [data, setData] = useState({
        email: '',
        name: '',
        password: '',
        confirmPassword: '',
    });
    const [viewPassword, setViewPassword] = useState(false);
    const { login, register, loading } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!loading) return;
        if (isLogin) {
            const logIn = await login({ email: data.email, password: data.password });
            if (logIn) {
                onClose();
            }
        } else {
            if (data.password !== data.confirmPassword) {
                toast.show('Contraseña incorrecta', 'warning');
                return;
            }
            if (data.password.length < 6) {
                toast.show('La contraseña debe tener al menos 6 caracteres', 'warning');
                return;
            }
            const registered = await register(data.name, data.email, data.password);
            if (registered) {
                setIsLogin(true);
                toast.show('Usuario registrado', 'success');
            }
        }
    };

    const handleInputChange = e => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    };

    const switchLogin = () => {
        setIsLogin(!isLogin);
        setData({
            email: '',
            name: '',
            password: '',
            confirmPassword: '',
        });
    };
    return (
        <div className="log_mask" onClick={onClose}>
            <div className="log_modal" onClick={e => e.stopPropagation()}>
                <div className="log_header">
                    <h2>{isLogin ? 'Iniciar Sesion' : 'Crear una cuenta'}</h2>
                    <button
                        className="log_header-close"
                        aria-label="Cerrar el modal de Logueo"
                        onClick={onClose}
                    >
                        <X size={30} />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="log_form">
                    {!isLogin && (
                        <div className="log_form-conteiner">
                            <label htmlFor="name">Nombre Completo</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={data.name}
                                onChange={handleInputChange}
                                placeholder="Ingresa tu nombre"
                                required={!isLogin}
                            />
                        </div>
                    )}
                    <div className="log_form-conteiner">
                        <label htmlFor="email">Correo</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={data.email}
                            onChange={handleInputChange}
                            placeholder="Ingresa tu correo..."
                            required
                        />
                    </div>
                    <div className="log_form-conteiner">
                        <label htmlFor="email">Contraseña</label>
                        <div className="log_form-password">
                            <input
                                type={viewPassword ? 'text' : 'password'}
                                id="password"
                                name="password"
                                value={data.password}
                                onChange={handleInputChange}
                                placeholder="Ingresa tu contraseña..."
                                required
                            />
                            <span onClick={() => setViewPassword(e => !e)}>
                                {viewPassword ? <EyeClosed /> : <Eye />}
                            </span>
                        </div>
                    </div>
                    {!isLogin && (
                        <div className="log_form-conteiner">
                            <label htmlFor="email">Confirma tu Contraseña</label>
                            <div className="log_form-password">
                                <input
                                    type={viewPassword ? 'text' : 'password'}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={data.confirmPassword}
                                    onChange={handleInputChange}
                                    placeholder="Confirma tu contraseña..."
                                    required={!isLogin}
                                />
                                <span onClick={() => setViewPassword(e => !e)}>
                                    {viewPassword ? <EyeClosed /> : <Eye />}
                                </span>
                            </div>
                        </div>
                    )}
                    <button
                        type="submit"
                        disabled={loading}

                        className={`btn btn-secondary login-submit ${loading ? 'loading' : ''}`}
                    >
                        {!loading ? 'Procesando...' : isLogin ? 'Iniciar Sesion' : 'Crear cuenta'}
                    </button>
                </form>

                <div className="log_switch">
                    {isLogin ? (
                        <p>
                            ¿No tienes una cuenta?{' '}
                            <button onClick={switchLogin} className="log_switch-btn">
                                Registro
                            </button>
                        </p>
                    ) : (
                        <p>
                            ¿Ya tienes una cuenta?{' '}
                            <button onClick={switchLogin} className="log_switch-btn">
                                Iniciar Sesion
                            </button>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
