import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../api/api';
import { Pokemon, PokemonState, PokemonListResponse } from '../types/pokemon';

const initialState: PokemonState = {
  pokemonList: [],
  currentPokemon: null,
  loading: false,
  error: null,
  searchQuery: '',
};

// Async thunks para buscar dados da API
export const fetchPokemonList = createAsyncThunk(
  'pokemon/fetchPokemonList',
  async (limit: number = 20): Promise<PokemonListResponse['results']> => {
    const response = await api.get(`/pokemon?limit=${limit}`);
    return response.data.results;
  }
);

export const fetchPokemonById = createAsyncThunk(
  'pokemon/fetchPokemonById',
  async (id: number) => {
    const response = await api.get(`/pokemon/${id}`);
    return response.data;
  }
);

export const searchPokemon = createAsyncThunk(
  'pokemon/searchPokemon',
  async (query: string) => {
    const response = await api.get(`/pokemon/${query.toLowerCase()}`);
    return response.data;
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
      })
      .addCase(fetchPokemonList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch Pokemon list';
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
        state.error = action.error.message || 'Pokemon not found';
      });
  },
});

export const { setSearchQuery, clearCurrentPokemon, clearError } = pokemonSlice.actions;

export default pokemonSlice.reducer;
