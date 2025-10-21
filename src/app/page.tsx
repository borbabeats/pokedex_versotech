'use client';

import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  fetchPokemonList,
  fetchPokemonById,
  searchPokemon,
  setSearchQuery,
  clearCurrentPokemon
} from '../slices/pokemonSlice';
import AbilityList from '../components/AbilityList';
import ModalPokemon from '../components/ModalPokemon';
import PokeCard from '../components/PokeCard';
import styles from "./page.module.css";

export default function Home() {
  const dispatch = useAppDispatch();
  const {
    pokemonList,
    currentPokemon,
    loading,
    error,
    searchQuery
  } = useAppSelector(state => state.pokemon);

  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    dispatch(fetchPokemonList(20));
  }, [dispatch]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      dispatch(searchPokemon(searchInput.trim()));
    }
  };

  const handlePokemonClick = (pokemonName: string) => {
    dispatch(searchPokemon(pokemonName));
  };

  const handleClearSearch = () => {
    dispatch(clearCurrentPokemon());
    setSearchInput('');
    dispatch(setSearchQuery(''));
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Pokédex</h1>

        {/* Search Form */}
        <form onSubmit={handleSearch} className={styles.searchForm}>
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Buscar Pokémon por nome..."
            className={styles.searchInput}
          />
          <button type="submit" className={styles.searchButton}>
            Buscar
          </button>
        </form>

        {/* Error Display */}
        {error && (
          <div className={styles.error}>
            {error}
          </div>
        )}

        {/* Current Pokemon Display */}
        {currentPokemon && (
          <div className={styles.pokemonCard}>
            <h2>{currentPokemon.name.toUpperCase()}</h2>
            <img
              src={currentPokemon.sprites.front_default}
              alt={currentPokemon.name}
              className={styles.pokemonImage}
            />
            <div className={styles.pokemonTypes}>
              {currentPokemon.types.map((typeInfo, index) => (
                <span key={index} className={styles.type}>
                  {typeInfo.type.name}
                </span>
              ))}
            </div>
            <div className={styles.pokemonStats}>
              <h3>Stats:</h3>
              {currentPokemon.stats.map((statInfo, index) => (
                <div key={index} className={styles.stat}>
                  <span className={styles.statName}>{statInfo.stat.name}:</span>
                  <span className={styles.statValue}>{statInfo.base_stat}</span>
                </div>
              ))}
            </div>

            {/* Componente de Habilidades */}
            <AbilityList abilities={currentPokemon.abilities} />
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className={styles.loading}>
            Carregando...
          </div>
        )}

        {/* Pokemon List */}
        <div className={styles.pokemonList}>
          <h3>Lista de Pokémons</h3>
          <div className={styles.pokemonGrid}>
            {pokemonList.map((pokemon, index) => (
              <PokeCard
                key={index}
                pokeName={pokemon.name}
                pokeId={parseInt(pokemon.url.split('/').filter(Boolean).pop() || '1', 10)}
                pokeDescription=""
                pokeAbility={[]}
                pokePhoto="/Pokedex_logo.png"
                pokeType={[]}
                pokeStats={[]}
                pokeCharac="Um Pokémon misterioso e poderoso!"
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
