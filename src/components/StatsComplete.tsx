import React from 'react';
import {
  Box,
  Typography,
  LinearProgress,
  linearProgressClasses,
} from '@mui/material';
import { styled } from '@mui/material/styles';

interface StatsProps {
  pokeStats: Array<{
    base_stat: number;
    stat: {
      name: string;
    };
  }>;
}

const StyledLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 12,
  borderRadius: 6,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: 'rgba(255, 107, 53, 0.1)',
    border: '1px solid rgba(255, 107, 53, 0.2)',
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 6,
    background: 'linear-gradient(45deg, #ff6b35, #e55a2b)',
    boxShadow: '0 2px 4px rgba(255, 107, 53, 0.3)',
  },
}));

const StatBox = styled(Box)(({ theme }) => ({
  marginBottom: '16px',
  padding: '12px',
  background: 'rgba(255, 255, 255, 0.8)',
  borderRadius: '12px',
  border: '1px solid rgba(255, 107, 53, 0.1)',
  transition: 'all 0.2s ease',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.9)',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(255, 107, 53, 0.15)',
  },
}));

export default function Stats({ pokeStats }: StatsProps) {
  // Verificando se pokeStats está disponível
  if (!pokeStats || pokeStats.length === 0) {
    return (
      <Box
        sx={{
          textAlign: 'center',
          padding: '20px',
          background: 'rgba(255, 255, 255, 0.8)',
          borderRadius: '12px',
          border: '1px solid rgba(255, 107, 53, 0.2)',
        }}
      >
        <Typography variant="body1" sx={{ color: '#666' }}>
          Infelizmente essas informações estão indisponíveis no momento
        </Typography>
      </Box>
    );
  }

  const getStatColor = (value: number) => {
    if (value >= 120) return '#ff6b35'; // Excelente (vermelho)
    if (value >= 90) return '#e55a2b';  // Muito bom (laranja)
    if (value >= 70) return '#f4a261';  // Bom (amarelo)
    if (value >= 50) return '#90e0ef';  // Regular (azul claro)
    return '#adb5bd'; // Baixo (cinza)
  };

  const formatStatName = (name: string) => {
    return name
      .replace('-', ' ')
      .replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <Box className="board-stats">
      <Typography
        variant="h5"
        sx={{
          textAlign: 'center',
          marginBottom: '20px',
          color: '#ff6b35',
          fontWeight: 'bold',
          textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
        }}
      >
        Combat Stats
      </Typography>

      <Box sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
        gap: 2,
        maxWidth: '500px',
        margin: '0 auto',
      }}>
        {pokeStats.map((stat, index) => (
          <StatBox key={index}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 500,
                  color: '#333',
                  textTransform: 'capitalize',
                }}
              >
                {formatStatName(stat.stat.name)}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 'bold',
                  color: getStatColor(stat.base_stat),
                  minWidth: '45px',
                  textAlign: 'right',
                }}
              >
                {stat.base_stat}
              </Typography>
            </Box>

            <StyledLinearProgress
              variant="determinate"
              value={(stat.base_stat / 160) * 100}
              sx={{
                '& .MuiLinearProgress-bar': {
                  background: `linear-gradient(45deg, ${getStatColor(stat.base_stat)}, ${getStatColor(stat.base_stat)}dd)`,
                },
              }}
            />

            <Box sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mt: 0.5,
              fontSize: '0.7rem',
              color: '#666'
            }}>
              <span>0</span>
              <span>160</span>
            </Box>
          </StatBox>
        ))}
      </Box>
    </Box>
  );
}
