import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../api/api';
import { Pokemon, PokemonState, PokemonListResponse } from '../types/pokemon';

const initialState: PokemonState = {
  pokemonList: [],
  currentPokemon: null,
  loading: false,
  error: null,
  searchQuery: '',
  offset: 0,
  currentPage: 1,
  totalPages: 1,
};

// Async thunks para buscar dados da API
export const fetchPokemonList = createAsyncThunk(
  'pokemon/fetchPokemonList',
  async ({ limit, page }: { limit: number; page: number }): Promise<PokemonListResponse['results']> => {
    const offset = (page - 1) * limit;
    const response = await api.get(`/pokemon?limit=${limit}&offset=${offset}`);
    return response.data.results;
  }
);

export const loadMorePokemon = createAsyncThunk(
  'pokemon/loadMorePokemon',
  async ({ limit, offset }: { limit: number; offset: number }): Promise<PokemonListResponse['results']> => {
    const response = await api.get(`/pokemon?limit=${limit}&offset=${offset}`);
    return response.data.results;
  }
);

export const fetchPokemonById = createAsyncThunk(
  'pokemon/fetchPokemonById',
  async (id: number) => {
    // Buscar dados básicos do pokemon
    const pokemonResponse = await api.get(`/pokemon/${id}`);
    const pokemonData = pokemonResponse.data;

    try {
      // Buscar dados da species para obter as flavor texts
      const speciesResponse = await api.get(`/pokemon-species/${id}`);
      const speciesData = speciesResponse.data;

      // Combinar os dados
      return {
        ...pokemonData,
        flavor_text_entries: speciesData.flavor_text_entries
      };
    } catch (error) {
      // Se não conseguir buscar species, retornar apenas os dados do pokemon
      return pokemonData;
    }
  }
);

export const searchPokemon = createAsyncThunk(
  'pokemon/searchPokemon',
  async (query: string) => {
    // Buscar dados básicos do pokemon
    const pokemonResponse = await api.get(`/pokemon/${query.toLowerCase()}`);
    const pokemonData = pokemonResponse.data;

    try {
      // Buscar dados da species para obter as flavor texts
      const speciesResponse = await api.get(`/pokemon-species/${pokemonData.id}`);
      const speciesData = speciesResponse.data;

      // Combinar os dados
      return {
        ...pokemonData,
        flavor_text_entries: speciesData.flavor_text_entries
      };
    } catch (error) {
      // Se não conseguir buscar species, retornar apenas os dados do pokemon
      return pokemonData;
    }
  }
);

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    clearCurrentPokemon: (state) => {
      state.currentPokemon = null;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    resetPokemonList: (state) => {
      state.pokemonList = [];
      state.offset = 0;
      state.currentPage = 1;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    nextPage: (state) => {
      if (state.currentPage < state.totalPages) {
        state.currentPage += 1;
      }
    },
    previousPage: (state) => {
      if (state.currentPage > 1) {
        state.currentPage -= 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Pokemon List
      .addCase(fetchPokemonList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPokemonList.fulfilled, (state, action: PayloadAction<PokemonListResponse['results']>) => {
        state.loading = false;
        state.pokemonList = action.payload;
        state.offset = state.currentPage * 20;
        // Estimativa de total de páginas (PokéAPI tem cerca de 1300 pokémons)
        state.totalPages = Math.ceil(1300 / 20);
      })
      .addCase(fetchPokemonList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch Pokemon list';
      })
      // Load More Pokemon (manter para compatibilidade, mas não será usado)
      .addCase(loadMorePokemon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadMorePokemon.fulfilled, (state, action: PayloadAction<PokemonListResponse['results']>) => {
        state.loading = false;
        state.pokemonList = [...state.pokemonList, ...action.payload];
        state.offset += action.payload.length;
      })
      .addCase(loadMorePokemon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load more Pokemon';
      })
      // Fetch Pokemon by ID
      .addCase(fetchPokemonById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPokemonById.fulfilled, (state, action: PayloadAction<Pokemon>) => {
        state.loading = false;
        state.currentPokemon = action.payload;
      })
      .addCase(fetchPokemonById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch Pokemon';
      })
      // Search Pokemon
      .addCase(searchPokemon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchPokemon.fulfilled, (state, action: PayloadAction<Pokemon>) => {
        state.loading = false;
        state.currentPokemon = action.payload;
      })
      .addCase(searchPokemon.rejected, (state, action) => {
        state.loading = false;
        state.currentPokemon = null; // Limpar currentPokemon quando a busca falha
      });
  },
});

export const { setSearchQuery, clearCurrentPokemon, clearError, resetPokemonList, setCurrentPage, nextPage, previousPage } = pokemonSlice.actions;

export default pokemonSlice.reducer;
