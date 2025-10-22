"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import PokeCard from "../components/PokeCard";
import {
  clearCurrentPokemon,
  fetchPokemonList,
  searchPokemon,
  setCurrentPage,
} from "../slices/pokemonSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import styles from "./page.module.css";

export default function Home() {
  const dispatch = useAppDispatch();
  const {
    pokemonList,
    currentPokemon,
    loading,
    error,
    currentPage,
    totalPages,
  } = useAppSelector((state) => state.pokemon);

  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    dispatch(fetchPokemonList({ limit: 20, page: currentPage }));
  }, [dispatch, currentPage]);

  // Buscar na API quando há texto no input
  useEffect(() => {
    if (searchInput.trim()) {
      dispatch(searchPokemon(searchInput.trim()));
    } else {
      dispatch(clearCurrentPokemon());
    }
  }, [searchInput, dispatch]);

  // Usar resultados da busca na API ou lista local
  const displayList = useMemo(() => {
    if (searchInput.trim()) {
      // Se a busca na API foi bem-sucedida (currentPokemon existe)
      if (currentPokemon) {
        return [
          {
            name: currentPokemon.name,
            url: `https://pokeapi.co/api/v2/pokemon/${currentPokemon.id}/`,
          },
        ];
      }
      // Se não encontrou na API (currentPokemon é null), filtrar na lista local
      return pokemonList.filter((pokemon: any) =>
        pokemon.name.toLowerCase().includes(searchInput.toLowerCase()),
      );
    }
    // Sem busca, mostrar lista completa
    return pokemonList;
  }, [pokemonList, searchInput, currentPokemon]);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchInput(value);
  };

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          src="/Pokedex_logo.png"
          alt="Pokedex Logo"
          width={200}
          height={70}
          className={styles.pokedexLogo}
          style={{ alignSelf: "center" }}
        />

        {/* Search Input */}
        <div className={styles.searchForm}>
          <input
            type="text"
            value={searchInput}
            onChange={handleSearchInputChange}
            placeholder="Buscar Pokémon por nome..."
            className={styles.searchInput}
          />
        </div>

        {/* Error Display */}
        {error && <div className={styles.error}>{error}</div>}

        {/* Loading State */}
        {loading && <div className={styles.loading}>Carregando...</div>}

        {/* Pokemon List */}
        <div className={styles.pokemonList}>
          <h3>
            {searchInput
              ? `Resultados para "${searchInput}": ${displayList.length}`
              : `Lista de Pokémons - Página ${currentPage} de ${totalPages} (${pokemonList.length} carregados)`}
          </h3>
          <div className={styles.pokemonGrid}>
            {displayList.map((pokemon, index) => (
              <PokeCard
                key={`${pokemon.name}-${index}`}
                pokeName={pokemon.name}
                pokeId={parseInt(
                  pokemon.url.split("/").filter(Boolean).pop() || "1",
                  10,
                )}
                pokeAbility={[]}
                pokePhoto="/pokeball-icon.png"
                pokeType={[]}
                pokeStats={[]}
                pokeCharac="Um Pokémon misterioso e poderoso!"
              />
            ))}
          </div>

          {/* Mensagem quando não há resultados */}
          {!loading && searchInput && displayList.length === 0 && (
            <div
              style={{ textAlign: "center", padding: "20px", color: "#666" }}
            >
              Nenhum Pokémon encontrado com o nome "{searchInput}"
            </div>
          )}

          {/* Controles de Paginação (apenas quando não há busca ativa) */}
          {!searchInput && !loading && totalPages > 1 && (
            <div className={styles.pagination}>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage <= 1}
                className={styles.pageButton}
                type="button"
              >
                Anterior
              </button>

              <span className={styles.pageInfo}>
                Página {currentPage} de {totalPages}
              </span>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className={styles.pageButton}
                type="button"
              >
                Próxima
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
