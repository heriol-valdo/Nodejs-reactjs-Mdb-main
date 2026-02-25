import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduits, deleteProduit } from '../redux/actions/produitActions';
import { isAuthenticated } from '../redux/actions/userActions';
import { Link, useNavigate } from 'react-router-dom';
import {
  Card, CardActions, CardContent, CardMedia, Modal, Box,
  Button, Typography, Grid, Container, Chip, Divider
} from '@mui/material';
import { UserInfo } from './UserInfo';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import InventoryIcon from '@mui/icons-material/Inventory';
import StarIcon from '@mui/icons-material/Star';
import VerifiedIcon from '@mui/icons-material/Verified';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import toast from 'react-hot-toast';

const ProduitList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const produits = useSelector(state => state.produits.items);
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedName, setSelectedName] = useState('');

  useEffect(() => {
    if (!isAuthenticated()) {
      toast.error('You must log in to access this session');
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    dispatch(fetchProduits());
  }, [dispatch]);

  const handleOpen = (id, name) => {
    setSelectedId(id);
    setSelectedName(name);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedId(null);
    setSelectedName('');
  };

  const handleDelete = () => {
    dispatch(deleteProduit(selectedId))
      .then(() => toast.success('Produit supprimé avec succès'))
      .catch(error => toast.error('Delete failed: ' + error.message));
    handleClose();
  };

  return (
    <Box sx={{ minHeight: '100vh', width: '100%',overflowX: 'hidden', boxSizing: 'border-box', background: 'linear-gradient(135deg, #0a0f2a 0%, #141a3a 100%)' }}>
      <UserInfo />

      <Container maxWidth="lg" sx={{ pt: 5, pb: 8, overflowX: 'hidden' }}>

        {/* Header section */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 5 }}>
          <Box>
            <Typography
              variant="h4"
              sx={{ fontWeight: 700, color: '#fff', mb: 0.5, letterSpacing: '-0.5px' }}
            >
              Catalogue produits
            </Typography>
            <Typography variant="body2" sx={{ color: '#888' }}>
              {produits.length} produit{produits.length !== 1 ? 's' : ''} enregistré{produits.length !== 1 ? 's' : ''}
            </Typography>
          </Box>

          <Button
            component={Link}
            to="/add/1"
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              px: 3,
              py: 1.3,
              backgroundColor: '#5f5fbd',
              color: '#fff',
              fontWeight: 600,
              borderRadius: 1.5,
              boxShadow: '0 0 20px rgba(95,95,189,0.35)',
              '&:hover': {
                backgroundColor: '#4747a0',
                boxShadow: '0 0 30px rgba(95,95,189,0.55)',
              },
            }}
          >
            Ajouter un produit
          </Button>
        </Box>

        {/* Empty state */}
        {produits.length === 0 && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              py: 10,
              gap: 2,
            }}
          >
            <Box
              sx={{
                width: 72,
                height: 72,
                borderRadius: 2,
                backgroundColor: 'rgba(95,95,189,0.1)',
                border: '1px solid rgba(95,95,189,0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <InventoryIcon sx={{ fontSize: 34, color: '#5f5fbd' }} />
            </Box>
            <Typography variant="h6" sx={{ color: '#fff', fontWeight: 600 }}>
              Aucun produit disponible
            </Typography>
            <Typography variant="body2" sx={{ color: '#666' }}>
              Commencez par ajouter votre premier produit
            </Typography>
            <Button
              component={Link}
              to="/add/1"
              variant="outlined"
              startIcon={<AddIcon />}
              sx={{
                mt: 1,
                borderColor: '#5f5fbd',
                color: '#8f8fe8',
                '&:hover': { backgroundColor: 'rgba(95,95,189,0.1)', borderColor: '#8f8fe8' },
              }}
            >
              Ajouter un produit
            </Button>
          </Box>
        )}

        {/* Grille de produits */}
        <Grid container spacing={3}>
          {produits.map((produit) => (
            <Grid item xs={12} sm={6} md={4} key={produit._id}>
              <Card
                sx={{
                  backgroundColor: '#1a1f3a',
                  border: '1px solid rgba(95,95,189,0.15)',
                  borderRadius: 2,
                  boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
                  color: '#fff',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
                    borderColor: 'rgba(95,95,189,0.4)',
                  },
                }}
              >
                {/* Image */}
                <Box
                  sx={{
                    background: 'linear-gradient(135deg, rgba(95,95,189,0.1) 0%, rgba(20,26,58,0.8) 100%)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    py: 3,
                    borderBottom: '1px solid rgba(95,95,189,0.1)',
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      height: 90,
                      width: 90,
                      objectFit: 'contain',
                      filter: 'drop-shadow(0 4px 12px rgba(95,95,189,0.3))',
                    }}
                    image="../../logo192.png"
                    alt={produit.name}
                  />
                </Box>

                <CardContent sx={{ pb: 1 }}>
                  {/* Nom + disponibilité */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#fff', fontSize: '1rem' }}>
                      {produit.name}
                    </Typography>
                    <Chip
                      label={produit.available ? 'Dispo' : 'Indispo'}
                      size="small"
                      sx={{
                        backgroundColor: produit.available
                          ? 'rgba(34,197,94,0.15)'
                          : 'rgba(239,68,68,0.15)',
                        color: produit.available ? '#22c55e' : '#ef4444',
                        border: `1px solid ${produit.available ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'}`,
                        fontSize: '0.65rem',
                        height: 20,
                      }}
                    />
                  </Box>

                  {/* Type */}
                  <Typography variant="caption" sx={{ color: '#888', display: 'block', mb: 1.5 }}>
                    {produit.type}
                  </Typography>

                  {/* Prix */}
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 800, color: '#8f8fe8', mb: 2, letterSpacing: '-0.5px' }}
                  >
                    €{produit.price}
                  </Typography>

                  {/* Infos secondaires */}
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <StarIcon sx={{ fontSize: 14, color: '#f59e0b' }} />
                      <Typography variant="caption" sx={{ color: '#ccc' }}>
                        {produit.rating}/5
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <VerifiedIcon sx={{ fontSize: 14, color: '#5f5fbd' }} />
                      <Typography variant="caption" sx={{ color: '#ccc' }}>
                        {produit.warranty_years} an{produit.warranty_years > 1 ? 's' : ''} garantie
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>

                <Divider sx={{ borderColor: 'rgba(95,95,189,0.1)', mx: 2 }} />

                <CardActions sx={{ px: 2, py: 1.5, gap: 1 }}>
                  <Button
                    size="small"
                    component={Link}
                    to={`/produit/${produit._id}/2`}
                    startIcon={<EditIcon sx={{ fontSize: 14 }} />}
                    sx={{
                      flex: 1,
                      color: '#8f8fe8',
                      border: '1px solid rgba(95,95,189,0.3)',
                      borderRadius: 1,
                      py: 0.7,
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      '&:hover': {
                        backgroundColor: 'rgba(95,95,189,0.12)',
                        borderColor: '#5f5fbd',
                      },
                    }}
                  >
                    Modifier
                  </Button>
                  <Button
                    size="small"
                    onClick={() => handleOpen(produit._id, produit.name)}
                    startIcon={<DeleteOutlineIcon sx={{ fontSize: 14 }} />}
                    sx={{
                      flex: 1,
                      color: '#ef4444',
                      border: '1px solid rgba(239,68,68,0.3)',
                      borderRadius: 1,
                      py: 0.7,
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      '&:hover': {
                        backgroundColor: 'rgba(239,68,68,0.08)',
                        borderColor: '#ef4444',
                      },
                    }}
                  >
                    Supprimer
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Modal de confirmation */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 380,
            backgroundColor: '#1a1f3a',
            border: '1px solid rgba(239,68,68,0.3)',
            borderRadius: 2,
            boxShadow: '0 0 60px rgba(0,0,0,0.7)',
            p: 4,
            color: '#fff',
          }}
        >
          {/* Icône avertissement */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                backgroundColor: 'rgba(239,68,68,0.1)',
                border: '1px solid rgba(239,68,68,0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <WarningAmberIcon sx={{ fontSize: 28, color: '#ef4444' }} />
            </Box>
          </Box>

          <Typography variant="h6" sx={{ fontWeight: 700, textAlign: 'center', mb: 1 }}>
            Confirmer la suppression
          </Typography>
          <Typography variant="body2" sx={{ color: '#aaa', textAlign: 'center', mb: 3 }}>
            Êtes-vous sûr de vouloir supprimer{' '}
            <span style={{ color: '#fff', fontWeight: 600 }}>"{selectedName}"</span> ?
            Cette action est irréversible.
          </Typography>

          <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)', mb: 3 }} />

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              fullWidth
              onClick={handleClose}
              sx={{
                py: 1.3,
                borderColor: 'rgba(255,255,255,0.15)',
                color: '#ccc',
                fontWeight: 600,
                '&:hover': {
                  borderColor: 'rgba(255,255,255,0.3)',
                  backgroundColor: 'rgba(255,255,255,0.05)',
                },
              }}
            >
              Annuler
            </Button>
            <Button
              variant="contained"
              fullWidth
              onClick={handleDelete}
              startIcon={<DeleteOutlineIcon />}
              sx={{
                py: 1.3,
                backgroundColor: '#ef4444',
                fontWeight: 600,
                boxShadow: '0 0 20px rgba(239,68,68,0.3)',
                '&:hover': {
                  backgroundColor: '#dc2626',
                  boxShadow: '0 0 28px rgba(239,68,68,0.5)',
                },
              }}
            >
              Supprimer
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default ProduitList;