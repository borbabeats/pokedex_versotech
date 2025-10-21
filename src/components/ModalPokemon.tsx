import React from 'react';
import { useAppSelector } from '../store/hooks';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  IconButton,
  Chip,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import AbilityList from './AbilityList';
import StatsComplete from './StatsComplete';
import './ModalPokemon.css';

interface ModalPokemonProps {
  isOpen: boolean;
  onClose: () => void;
  pokeName: string;
  pokeAbility: Array<{
    ability: {
      name: string;
    };
    is_hidden: boolean;
  }>;
  pokeType: string[];
  pokeId: number;
  pokePhoto: string;
  pokeStats: Array<{
    base_stat: number;
    stat: {
      name: string;
    };
  }>;
  pokeCharac: string;
}

const typeIcons: { [key: string]: string } = {
  fire: '/types/fire.png',
  water: '/types/water.svg',
  grass: '/types/grass.png',
  electric: '/types/electric.svg',
  fairy: '/types/fairy.svg',
  dragon: '/types/dragon.png',
  dark: '/types/dark.svg',
  bug: '/types/bug.png',
  fighting: '/types/fighting.svg',
  flying: '/types/flying.png',
  ghost: '/types/ghost.png',
  ground: '/types/ground.svg',
  ice: '/types/ice.svg',
  normal: '/types/normal.svg',
  poison: '/types/poison.svg',
  psychic: '/types/psychic.svg',
  rock: '/types/rock.svg',
  steel: '/types/steel.svg',
};

export default function ModalPokemon({
  isOpen,
  onClose,
  pokeName,
  pokeAbility,
  pokeType,
  pokeId,
  pokePhoto,
  pokeStats,
  pokeCharac,
}: ModalPokemonProps) {

  const { loading } = useAppSelector(state => state.pokemon);
  const isLoading = loading && pokeStats.length === 0;

  const getPokemonImage = () => {
    const imageUrl = `/pokemonHD/${pokeId}.png`;
    return imageUrl || pokePhoto;
  };

  const getTypeChips = () => {
    if (!pokeType || pokeType.length === 0) return null;

    return pokeType.map((type, index) => {
      const typeKey = type.toLowerCase();
      const iconSrc = typeIcons[typeKey];

      return (
        <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {iconSrc && (
            <img
              src={iconSrc}
              alt={type}
              style={{ width: '24px', height: '24px' }}
            />
          )}
          <Chip
            label={type}
            variant="outlined"
            sx={{
              backgroundColor: 'rgba(255, 107, 53, 0.1)',
              borderColor: '#ff6b35',
              color: '#ff6b35',
              fontWeight: 'bold',
              textTransform: 'uppercase',
            }}
          />
        </Box>
      );
    });
  };

  // Se estiver carregando e não há stats, mostrar loading
  if (isLoading) {
    return (
      <Dialog
        open={isOpen}
        onClose={onClose}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 107, 53, 0.1) 100%)',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            border: '2px solid rgba(255, 107, 53, 0.3)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '300px',
          }
        }}
      >
        <Box sx={{
          textAlign: 'center',
          padding: '40px',
        }}>
          <img src="/pokeball-loader.gif" alt="Loading" style={{ width: '60px', marginBottom: '20px' }} />
          <Typography variant="h6" sx={{ color: '#ff6b35', fontWeight: 'bold' }}>
            Carregando detalhes de {pokeName}...
          </Typography>
        </Box>
      </Dialog>
    );
  }

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 107, 53, 0.1) 100%)',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
          border: '2px solid rgba(255, 107, 53, 0.3)',
        }
      }}
    >
      <DialogTitle className="header">
        <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold' }}>
          {pokeName}
        </Typography>

        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          {getTypeChips()}
          <IconButton
            onClick={onClose}
            sx={{
              color: '#333',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
              }
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent className="body">
        <Box sx={{ padding: '24px' }}>
          {/* Habilidades */}
          <AbilityList abilities={pokeAbility} />

          {/* Conteúdo Principal */}
          <Box sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 3,
            mt: 2
          }}>
            {/* Imagem e Características */}
            <Box sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
            }}>
              <img
                src={getPokemonImage()}
                alt={pokeName}
                style={{
                  maxWidth: '360px',
                  width: '100%',
                  height: 'auto'
                }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = pokePhoto;
                }}
              />

              <Box className="poke-comics">
                A wild {pokeName} appears!...
                <br />
                {pokeCharac}
              </Box>
            </Box>

            {/* Stats */}
            <Box className="modal-stats-section">
              <StatsComplete pokeStats={pokeStats} />
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
