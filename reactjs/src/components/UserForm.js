import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from '../redux/actions/userActions';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Card, TextField, Button, Typography } from '@mui/material';
import toast from 'react-hot-toast';

const UserForm = () => {
  const [isFormValid, setIsFormValid] = useState(false);
  const [user, setUser] = useState({ name: '', email: '', password: '' });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Met à jour les champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  // Vérifie si le formulaire est valide
  useEffect(() => {
    setIsFormValid(user.name !== '' && user.email !== '' && user.password !== '');
  }, [user]);

  // Soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addUser(user))
      .then(() => {
        toast.success('Vous êtes inscrit avec succès.');
        navigate('/login');
      })
      .catch((error) => {
        toast.error('Échec de l\'inscription: ' + error.message);
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
            Inscription
          </Typography>
          <Typography variant="body2" sx={{ color: '#ccc' }}>
            Créez votre compte pour accéder à votre espace
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <TextField
            name="name"
            label="Nom complet"
            value={user.name}
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
            S'inscrire
          </Button>
        </form>

        <Typography variant="body2" sx={{ textAlign: 'center', mt: 2, color: '#888' }}>
          Vous avez déjà un compte ?{' '}
          <Link to="/login" style={{ color: '#5f5fbd', textDecoration: 'none' }}>
            Connexion
          </Link>
        </Typography>
      </Card>
    </Box>
  );
};

export default UserForm;