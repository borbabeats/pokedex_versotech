import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchPokemonById } from '../slices/pokemonSlice';
import ModalPokemon from './ModalPokemon';
import './PokeCard.css';

interface PokeCardProps {
  pokeName: string;
  pokeId: number;
  pokeDescription?: string;
  pokeAbility: Array<{
    ability: {
      name: string;
    };
    is_hidden: boolean;
  }>;
  pokePhoto: string;
  pokeType: string[];
  pokeStats: Array<{
    base_stat: number;
    stat: {
      name: string;
    };
  }>;
  pokeCharac: string;
}

const typeColors: { [key: string]: string } = {
  fire: '#F08030',
  water: '#6890F0',
  grass: '#78C850',
  electric: '#F8D030',
  flying: '#A890F0',
  bug: '#A8B820',
  dragon: '#7038F8',
  dark: '#705848',
  poison: '#A040A0',
  fairy: '#EE99AC',
  fighting: '#C03028',
  normal: '#A8A878',
  ground: '#E0C068',
  ghost: '#705898',
  ice: '#98D8D8',
  psychic: '#F85888',
  rock: '#B8A038',
  steel: '#B8B8D0',
};

export default function PokeCard({
  pokeName,
  pokeId,
  pokeDescription,
  pokeAbility,
  pokePhoto,
  pokeType,
  pokeStats,
  pokeCharac,
}: PokeCardProps) {
  const dispatch = useAppDispatch();
  const { currentPokemon, loading } = useAppSelector(state => state.pokemon);
  const [modalOpen, setModalOpen] = useState(false);
  const [pokemonImage, setPokemonImage] = useState<string>(pokePhoto);

  // Buscar imagem do Pokémon quando o componente é montado
  useEffect(() => {
    const fetchPokemonImage = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId}`);
        const data = await response.json();
        setPokemonImage(data.sprites?.front_default || '/Pokedex_logo.png');
      } catch (error) {
        console.error('Erro ao buscar imagem do Pokémon:', error);
        setPokemonImage('/Pokedex_logo.png');
      }
    };

    fetchPokemonImage();
  }, [pokeId]);

  const handleOpenModal = () => {
    if (pokeId && pokeId > 0) {
      dispatch(fetchPokemonById(pokeId));
      setModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div className="poke-card">
        {/* Pokeball Icon Overlay */}
        <div className="pokeball-overlay">
          <img
            src="/pokeball-icon.png"
            alt="pokeball"
            className="pokeball-icon"
          />
        </div>

        {/* Pokemon Image with Animated Background */}
        <div className="poke-card-image-container">
          <img
            src={pokemonImage}
            alt={pokeName}
            className="poke-card-image"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/pokeball-loader.gif';
            }}
          />
        </div>

        {/* Card Content */}
        <div className="poke-card-body">
          <div style={{ textAlign: 'center' }}>
            <h4 className="poke-card-title">
              {pokeName.toUpperCase()}
            </h4>
            <div className="poke-id">
              Nº {pokeId}
            </div>

            {/* More Info Button */}
            <button
              className="more-info-button"
              onClick={handleOpenModal}
            >
              More Info
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <ModalPokemon
        isOpen={modalOpen}
        onClose={handleCloseModal}
        pokeName={currentPokemon?.name || pokeName}
        pokeAbility={currentPokemon?.abilities || pokeAbility}
        pokeType={currentPokemon?.types?.map((t: any) => t.type.name.toUpperCase()) || pokeType}
        pokeId={currentPokemon?.id || pokeId}
        pokePhoto={currentPokemon?.sprites?.front_default || pokePhoto}
        pokeStats={currentPokemon?.stats || pokeStats}
        pokeCharac={pokeCharac}
      />
    </>
  );
}
