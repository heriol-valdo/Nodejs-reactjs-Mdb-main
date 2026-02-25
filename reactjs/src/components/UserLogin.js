import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser, isAuthenticated } from '../redux/actions/userActions';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Card, TextField, Button, Typography } from '@mui/material';
import toast from 'react-hot-toast';

const UserLogin = () => {
  const [isFormValid, setIsFormValid] = useState(false);
  const [user, setUser] = useState({ email: '', password: '' });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Rediriger si déjà connecté
  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/');
      toast.info('Vous êtes déjà connecté.');
    }
  }, [navigate]);

  // Validation du formulaire
  useEffect(() => {
    setIsFormValid(user.email !== '' && user.password !== '');
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginUser(user))
      .then(() => {
        toast.success("Vous êtes connecté.");
        navigate('/');
      })
      .catch((error) => {
        toast.error('Échec de la connexion: ' + error.message);
      });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        width: '100%',
        boxSizing: 'border-box',
        overflowX: 'hidden',
        background: 'linear-gradient(135deg, #0a0f2a 0%, #141a3a 100%)',
      }}
    >
      <Card
        sx={{
          width: 360,
          p: 4,
          borderRadius: 2,
          boxShadow: '0px 0px 40px rgba(0,0,0,0.5)',
          backgroundColor: '#1a1f3a',
          color: '#fff',
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 1,
              backgroundColor: '#5f5fbd',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 1,
            }}
          >
            <Typography variant="h6" sx={{ color: '#fff' }}>
              ★
            </Typography>
          </Box>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
            SEO AI Systems
          </Typography>
          <Typography variant="body2" sx={{ color: '#ccc' }}>
            Automatisez 80% de votre SEO et gagnez +30h/semaine.
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <TextField
            name="email"
            label="Email professionnel"
            type="email"
            value={user.email}
            onChange={handleChange}
            fullWidth
            margin="dense"
            variant="outlined"
            sx={{
              mb: 2,
              input: { color: '#fff' },
              label: { color: '#ccc' },
              fieldset: { borderColor: '#444' },
              '&:hover fieldset': { borderColor: '#5f5fbd' },
              '&.Mui-focused fieldset': { borderColor: '#5f5fbd' },
            }}
          />
          <TextField
            name="password"
            label="Mot de passe"
            type="password"
            value={user.password}
            onChange={handleChange}
            fullWidth
            margin="dense"
            variant="outlined"
            sx={{
              mb: 3,
              input: { color: '#fff' },
              label: { color: '#ccc' },
              fieldset: { borderColor: '#444' },
              '&:hover fieldset': { borderColor: '#5f5fbd' },
              '&.Mui-focused fieldset': { borderColor: '#5f5fbd' },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={!isFormValid}
            sx={{
              mb: 2,
              py: 1.5,
              backgroundColor: '#5f5fbd',
              color: '#fff',
              fontWeight: 600,
              '&:hover': { backgroundColor: '#4747a0' },
            }}
          >
            Se connecter avec email
          </Button>
        </form>

        <Typography variant="body2" sx={{ textAlign: 'center', mt: 2, color: '#888' }}>
          Pas encore de compte ?{' '}
          <Link to="/addUser" style={{ color: '#5f5fbd', textDecoration: 'none' }}>
            S'inscrire
          </Link>
        </Typography>
      </Card>
    </Box>
  );
};

export default UserLogin;