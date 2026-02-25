import { logout, getUser, getCurrentUser, isAuthenticated } from '../redux/actions/userActions';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Box, Container, Typography, Avatar, Chip, Divider,  Tooltip } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import toast from 'react-hot-toast';

export const UserInfo = () => {
  const [user, setUser] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redirige si l'utilisateur n'est pas connecté
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
      toast.error('Vous devez être connecté pour accéder à cette session');
    }
  }, [navigate]);

  // Récupération des informations utilisateur
  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentUser = getCurrentUser();
        const fetchedUser = await dispatch(getUser(currentUser._id));
        setUser({ name: fetchedUser.name, email: fetchedUser.email });
      } catch (error) {
        console.error('Erreur lors de la récupération des données utilisateur', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [dispatch]);

  // Déconnexion
  const handleLogout = async () => {
    const log = await dispatch(logout());
    if (log) {
      toast.success('vous êtes déconnecté');
      navigate('/login');
    }
  };

  // Initiales pour l'avatar
  const getInitials = (name) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Box
      sx={{
        width: '100%',
        background: 'linear-gradient(135deg, #0a0f2a 0%, #141a3a 100%)',
        borderBottom: '1px solid rgba(95, 95, 189, 0.3)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.4)',
        py: 1.5,
        px: 3,
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
        }}
      >
        {/* Logo / Brand */}
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: 1,
            backgroundColor: '#5f5fbd',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Typography variant="body1" sx={{ color: '#fff', fontWeight: 700 }}>
            ★
          </Typography>
        </Box>

        <Divider
          orientation="vertical"
          flexItem
          sx={{ borderColor: 'rgba(255,255,255,0.1)' }}
        />

        {/* Infos utilisateur */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            flex: 1,
            opacity: loading ? 0.4 : 1,
            transition: 'opacity 0.4s ease',
          }}
        >
          {/* Avatar */}
          <Avatar
            sx={{
              width: 40,
              height: 40,
              backgroundColor: 'transparent',
              border: '2px solid #5f5fbd',
              color: '#5f5fbd',
              fontWeight: 700,
              fontSize: '0.85rem',
            }}
          >
            {getInitials(user.name)}
          </Avatar>

          {/* Nom + Email */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
              <PersonIcon sx={{ fontSize: 14, color: '#5f5fbd' }} />
              <Typography
                variant="body2"
                sx={{ color: '#fff', fontWeight: 600, lineHeight: 1 }}
              >
                {user.name || '—'}
              </Typography>
            </Box>
            {user.email && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                <EmailIcon sx={{ fontSize: 13, color: '#888' }} />
                <Typography variant="caption" sx={{ color: '#888', lineHeight: 1 }}>
                  {user.email}
                </Typography>
              </Box>
            )}
          </Box>

          {/* Badge statut */}
          <Chip
            label="Connecté"
            size="small"
            sx={{
              backgroundColor: 'rgba(95, 95, 189, 0.15)',
              color: '#8f8fe8',
              border: '1px solid rgba(95, 95, 189, 0.4)',
              fontSize: '0.65rem',
              height: 20,
              ml: 1,
            }}
          />
        </Box>

        {/* Bouton Logout */}
        <Tooltip title="Se déconnecter" placement="bottom">
          <Box
            onClick={handleLogout}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              cursor: 'pointer',
              px: 2,
              py: 0.8,
              borderRadius: 1.5,
              border: '1px solid rgba(239, 68, 68, 0.3)',
              color: '#ef4444',
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.6)',
                transform: 'translateY(-1px)',
                boxShadow: '0 4px 12px rgba(239, 68, 68, 0.2)',
              },
              '&:active': {
                transform: 'translateY(0)',
              },
            }}
          >
            <LogoutIcon sx={{ fontSize: 16 }} />
            <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.8rem' }}>
              Déconnexion
            </Typography>
          </Box>
        </Tooltip>
      </Container>
    </Box>
  );
};

export default UserInfo;