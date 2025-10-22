import React, { useEffect, useState } from "react";
import { fetchPokemonById } from "../slices/pokemonSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import ModalPokemon from "./ModalPokemon";
import "./PokeCard.css";

interface PokeCardProps {
  pokeName: string;
  pokeId: number;
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

export default function PokeCard({
  pokeName,
  pokeId,
  pokeAbility,
  pokePhoto,
  pokeType,
  pokeStats,
  pokeCharac,
}: PokeCardProps) {
  const dispatch = useAppDispatch();
  const { currentPokemon, loading } = useAppSelector((state) => state.pokemon);
  const [modalOpen, setModalOpen] = useState(false);
  const [pokemonImage, setPokemonImage] = useState<string>(pokePhoto);

  // Buscar imagem do Pokémon quando o componente é montado
  useEffect(() => {
    const fetchPokemonImage = async () => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokeId}`,
        );
        const data = await response.json();
        setPokemonImage(data.sprites?.front_default || "/pokeball-icon.png");
      } catch (error) {
        console.error("Erro ao buscar imagem do Pokémon:", error);
        setPokemonImage("/pokeball-icon.png");
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
              (e.target as HTMLImageElement).src = "/pokeball-loader.gif";
            }}
          />
        </div>

        {/* Card Content */}
        <div className="poke-card-body">
          <div style={{ textAlign: "center" }}>
            <h4 className="poke-card-title">{pokeName.toUpperCase()}</h4>
            <div className="poke-id">Nº {pokeId}</div>

            {/* More Info Button */}
            <button className="more-info-button" onClick={handleOpenModal} type="button">
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
        pokeType={
          currentPokemon?.types?.map((t: any) => t.type.name.toUpperCase()) ||
          pokeType
        }
        pokeId={currentPokemon?.id || pokeId}
        pokePhoto={currentPokemon?.sprites?.front_default || pokePhoto}
        pokeStats={currentPokemon?.stats || pokeStats}
        pokeCharac={currentPokemon?.flavor_text_entries || pokeCharac}
      />
    </>
  );
}
