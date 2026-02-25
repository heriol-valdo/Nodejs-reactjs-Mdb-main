import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduit, getProduit, updateProduit } from '../redux/actions/produitActions';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { UserInfo } from './UserInfo';
import {
  Container, Card, TextField, Button, Select, MenuItem,
  InputLabel, Box, Typography, Divider, InputAdornment
} from '@mui/material';
import InventoryIcon from '@mui/icons-material/Inventory';
import CategoryIcon from '@mui/icons-material/Category';
import EuroIcon from '@mui/icons-material/Euro';
import StarIcon from '@mui/icons-material/Star';
import VerifiedIcon from '@mui/icons-material/Verified';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import toast from 'react-hot-toast';

const fieldSx = {
  mb: 2,
  '& .MuiOutlinedInput-root': {
    color: '#fff',
    '& fieldset': { borderColor: '#2e3460' },
    '&:hover fieldset': { borderColor: '#5f5fbd' },
    '&.Mui-focused fieldset': { borderColor: '#5f5fbd' },
  },
  '& .MuiInputLabel-root': { color: '#888' },
  '& .MuiInputLabel-root.Mui-focused': { color: '#8f8fe8' },
  '& .MuiInputAdornment-root svg': { color: '#5f5fbd' },
  '& input[type=number]::-webkit-inner-spin-button': { WebkitAppearance: 'none' },
};

const ProduitForm = () => {
  const [isFormValid, setIsFormValid] = useState(false);
  const [title, setTitle] = useState('');

  const initialProduitState = useMemo(() => ({
    name: '',
    type: '',
    price: 0,
    rating: 0,
    warranty_years: 0,
    available: true,
  }), []);

  const [produit, setProduit] = useState(initialProduitState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id, ed } = useParams();
  const existingProduit = useSelector(state => state.produits.item);

  useEffect(() => {
    if (id) {
      dispatch(getProduit(id)).catch(error => toast.error('Fetch failed: ' + error.message));
    } else {
      setProduit(initialProduitState);
    }
    setTitle(ed === '1' ? 'Ajouter un produit' : 'Modifier le produit');
  }, [id, ed, initialProduitState, dispatch]);

  useEffect(() => {
    if (id && existingProduit) setProduit(existingProduit);
  }, [existingProduit, id]);

  useEffect(() => {
    setIsFormValid(
      produit.name !== '' &&
      produit.type !== '' &&
      produit.price !== '' &&
      produit.rating !== '' &&
      produit.warranty_years !== '' &&
      produit.available !== ''
    );
  }, [produit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduit({ ...produit, [name]: value });
  };

  const handleAvailableChange = (e) => {
    setProduit({ ...produit, available: e.target.value === 'true' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const action = id ? updateProduit(id, produit) : addProduit(produit);
    dispatch(action)
      .then(() => toast.success(id ? 'Produit mis à jour avec succès' : 'Produit ajouté avec succès'))
      .catch(error => toast.error('Opération échouée : ' + error.message));
    navigate('/');
  };

  return (
    <Box sx={{ minHeight: '100vh', width: '100%', overflowX: 'hidden', boxSizing: 'border-box', background: 'linear-gradient(135deg, #0a0f2a 0%, #141a3a 100%)' }}>
      <UserInfo />

      <Container sx={{ display: 'flex', justifyContent: 'center', overflowX: 'hidden', alignItems: 'flex-start', pt: 6, pb: 6 }}>
        <Card
          sx={{
            width: 420,
            p: 4,
            borderRadius: 2,
            backgroundColor: '#1a1f3a',
            boxShadow: '0px 0px 60px rgba(0,0,0,0.6)',
            border: '1px solid rgba(95, 95, 189, 0.15)',
            color: '#fff',
          }}
        >
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box
              sx={{
                width: 52,
                height: 52,
                borderRadius: 1.5,
                backgroundColor: '#5f5fbd',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 1.5,
                boxShadow: '0 0 20px rgba(95,95,189,0.4)',
              }}
            >
              <InventoryIcon sx={{ color: '#fff', fontSize: 26 }} />
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#fff', mb: 0.5 }}>
              {title}
            </Typography>
            <Typography variant="body2" sx={{ color: '#888' }}>
              {id ? 'Modifiez les informations du produit' : 'Remplissez les informations du nouveau produit'}
            </Typography>
          </Box>

          <Divider sx={{ borderColor: 'rgba(95,95,189,0.2)', mb: 3 }} />

          {/* Formulaire */}
          <form onSubmit={handleSubmit}>
            <TextField
              name="name"
              label="Nom du produit"
              value={produit.name}
              onChange={handleChange}
              fullWidth
              sx={fieldSx}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <InventoryIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              name="type"
              label="Type / Catégorie"
              value={produit.type}
              onChange={handleChange}
              fullWidth
              sx={fieldSx}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CategoryIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              name="price"
              label="Prix"
              value={produit.price}
              onChange={handleChange}
              type="number"
              fullWidth
              sx={fieldSx}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EuroIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              name="rating"
              label="Note (rating)"
              value={produit.rating}
              onChange={handleChange}
              type="number"
              fullWidth
              sx={fieldSx}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <StarIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              name="warranty_years"
              label="Garantie (années)"
              value={produit.warranty_years}
              onChange={handleChange}
              type="number"
              fullWidth
              sx={fieldSx}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <VerifiedIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />

            {/* Select disponibilité */}
            <Box sx={{ mb: 3 }}>
              <InputLabel
                sx={{
                  color: '#888',
                  fontSize: '0.85rem',
                  mb: 0.8,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.8,
                }}
              >
                <CheckCircleIcon sx={{ fontSize: 16, color: '#5f5fbd' }} />
                Disponibilité
              </InputLabel>
              <Select
                name="available"
                value={produit.available ? 'true' : 'false'}
                onChange={handleAvailableChange}
                fullWidth
                sx={{
                  color: '#fff',
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#2e3460' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#5f5fbd' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#5f5fbd' },
                  '& .MuiSvgIcon-root': { color: '#888' },
                  backgroundColor: 'transparent',
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      backgroundColor: '#1a1f3a',
                      color: '#fff',
                      border: '1px solid rgba(95,95,189,0.3)',
                    },
                  },
                }}
              >
                <MenuItem value="true" sx={{ '&:hover': { backgroundColor: 'rgba(95,95,189,0.15)' } }}>
                  ✅ Disponible
                </MenuItem>
                <MenuItem value="false" sx={{ '&:hover': { backgroundColor: 'rgba(239,68,68,0.1)' } }}>
                  ❌ Indisponible
                </MenuItem>
              </Select>
            </Box>

            <Divider sx={{ borderColor: 'rgba(95,95,189,0.2)', mb: 3 }} />

            {/* Boutons */}
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                component={Link}
                to="/"
                variant="outlined"
                fullWidth
                startIcon={<ArrowBackIcon />}
                sx={{
                  py: 1.4,
                  borderColor: 'rgba(239,68,68,0.4)',
                  color: '#ef4444',
                  fontWeight: 600,
                  '&:hover': {
                    borderColor: '#ef4444',
                    backgroundColor: 'rgba(239,68,68,0.08)',
                  },
                }}
              >
                Retour
              </Button>

              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={!isFormValid}
                startIcon={<SaveIcon />}
                sx={{
                  py: 1.4,
                  backgroundColor: '#5f5fbd',
                  color: '#fff',
                  fontWeight: 600,
                  boxShadow: '0 0 20px rgba(95,95,189,0.3)',
                  '&:hover': {
                    backgroundColor: '#4747a0',
                    boxShadow: '0 0 28px rgba(95,95,189,0.5)',
                  },
                  '&:disabled': {
                    backgroundColor: 'rgba(95,95,189,0.2)',
                    color: 'rgba(255,255,255,0.3)',
                  },
                }}
              >
                Enregistrer
              </Button>
            </Box>
          </form>
        </Card>
      </Container>
    </Box>
  );
};

export default ProduitForm;