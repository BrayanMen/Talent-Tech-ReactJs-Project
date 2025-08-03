import './ProfileCard.css'

export const ProfileCard = ({ user, navigate }) => {
    return (
        <div className="profile-card-container">
            <div className="profile-card">
                <div className="profile-info">
                    <img
                        src={
                            user.avatar || 'https://cdn-icons-png.flaticon.com/512/6596/6596121.png'
                        }
                        alt={user.name}
                        className="profile-avatar"
                    />
                    <h2 className="profile-name">{user.name}</h2>
                    <p className="profile-email">{user.email}</p>

                    <div className="profile-role">
                        <span className="role-badge">
                            {user.role === 'admin' ? 'Admin' : 'Customer'}
                        </span>
                    </div>

                    <div className="profile-navigation">
                        <div className="nav-links">
                            <button onClick={() => navigate('/wishlist')} className="nav-link">
                                Favoritos
                            </button>

                            {user.role === 'admin' && (
                                <button onClick={() => navigate('/admin')} className="nav-link">
                                    Panel de Control
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
