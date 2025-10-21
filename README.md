# Pokédex - Next.js com Redux

Este é um projeto [Next.js](https://nextjs.org) que implementa uma Pokédex usando Redux Toolkit para gerenciamento de estado.

## ✅ Status do Projeto

**Aplicação funcionando perfeitamente!** 🚀

- ✅ **Redux Toolkit configurado** e funcionando
- ✅ **Lista de 20 Pokémons** carregando da PokéAPI
- ✅ **Busca por nome** funcionando
- ✅ **Interface responsiva** com design moderno
- ✅ **Modo escuro** automático
- ✅ **Server Components** configurados corretamente

### 🌐 **Acesso**

A aplicação está rodando em: **http://localhost:3000**

### 🎮 **Funcionalidades Ativas**

1. **Lista Inicial**: 20 Pokémons carregam automaticamente ao abrir
2. **Busca Interativa**: Digite o nome de qualquer Pokémon
3. **Cards Interativos**: Cada Pokémon em cards elegantes com design escuro e animações
4. **Background Personalizado** - Padrão de pokeballs com gradiente temático
5. **Modal Estilo Stadium** - Modal temático com background da arena Pokémon
6. **Stats com Barras** - Visualização das estatísticas com progress bars temáticas
7. **Design Responsivo** - Funciona em desktop e mobile
## Stack Tecnológica

- **Framework**: Next.js 15.5.6 (App Router)
- **Estado Global**: Redux Toolkit para gerenciamento centralizado
- **UI Library**: Material UI (Modal) + CSS Customizado (Cards)
- **API**: PokéAPI (https://pokeapi.co)
- **Styling**: CSS Modules + CSS Customizado + Material UI Theme
- **TypeScript**: Configuração completa
- **Linting**: Biome

## Instalação e Execução

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### Passos

1. **Clone o projeto**
   ```bash
   git clone <repository-url>
   cd pokedex_versotech
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Execute o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```

4. **Abra o navegador**
   - Local: [http://localhost:3000](http://localhost:3000)
   - Network: [http://172.19.80.1:3000](http://172.19.80.1:3000)

## 🔄 Arquitetura Redux

### Fluxo de Dados Otimizado
- **PokeCard** → `fetchPokemonById(pokeId)` → **Redux Store** → **ModalPokemon**
- **Estado limpo**: `clearCurrentPokemon()` ao fechar modal
- **Loading unificado**: Estado de loading gerenciado globalmente
- **Dados consistentes**: Mesmo Pokémon sempre mostra as mesmas informações

### Actions Redux Utilizadas
- `fetchPokemonList(limit)` - Lista inicial de Pokémons
- `searchPokemon(name)` - Busca por nome
- `fetchPokemonById(id)` - Dados completos para modal
- `clearCurrentPokemon()` - Limpeza do estado

### Benefícios da Arquitetura
- ✅ **Sem prop drilling**: Dados fluem através do Redux, não por props
- ✅ **Estado consistente**: Todos os componentes usam a mesma fonte de dados
- ✅ **Performance**: Reutilização de dados já carregados
- ✅ **Debugging**: Estado centralizado fácil de inspecionar
- ✅ **Escalabilidade**: Fácil adicionar novos componentes que precisam dos dados

### Problema Resolvido
**Antes**: Modal aparecia rapidamente e desaparecia porque dados eram limpos antes da renderização
**Depois**: Modal gerencia seu próprio estado de loading e renderiza corretamente com dados do Redux

#### Correções Implementadas:
- **Loading interno**: ModalPokemon agora verifica `loading` do Redux
- **Renderização condicional**: Modal só mostra conteúdo quando dados estão disponíveis
- **Fallback de dados**: Usa dados resumidos como fallback durante loading
- **Limpeza otimizada**: `clearCurrentPokemon()` com delay para evitar conflitos

## 🎨 Componentes Material UI

### AbilityList Component
- **Chips interativos** para exibir habilidades dos Pokémons
- **Diferenciação visual** entre habilidades normais e hidden abilities
- **Tema personalizado** com cores da Pokédex (#ff6b35)
- **Responsivo** e otimizado para todos os dispositivos

### MUIProvider Component
- **Theme Provider** configurado com paleta personalizada
- **Typography** com gradientes temáticos
- **Component overrides** para Chips com hover effects
- **Modo escuro** integrado automaticamente

### Recursos Visuais
- ✨ **Gradiente no título** "Habilidades"
- 🎯 **Chips com hover effects** (scale + color transition)
- 🌙 **Hidden abilities** com estilo outlined diferenciado
- 📱 **Layout responsivo** com flexbox

## 🎭 ModalPokemon Component

### Funcionalidades do Modal
- **Dialog Material UI** com backdrop blur e animações
- **Layout responsivo** com Grid adaptativo para mobile/desktop
- **Header com gradiente** mostrando nome e tipos do Pokémon
- **Seção de imagem** com fallback para sprite padrão
- **Stats com barras de progresso** usando componente StatsComplete
- **Loading interno** com verificação de estado Redux
- **Características do Pokémon** em box estilizado

### Design Stadium Features
- 🏟️ **Background arena Pokémon Stadium** (desktop)
- 📱 **Background mobile otimizado** para telas menores
- 🎮 **Texto estilo game** com fonte Press Start 2P
- 🎨 **Header cinza elegante** para melhor contraste

## 📊 StatsComplete Component - Grid Layout

### Layout Responsivo
- 🖥️ **Desktop (md+)**: Grid de 2 colunas para melhor aproveitamento do espaço
- 📱 **Mobile (xs)**: Layout de 1 coluna para melhor legibilidade
- 🎯 **Grid centrado**: Max-width de 500px com margens automáticas
- 📏 **Gap otimizado**: Espaçamento de 16px entre os cards

### Visual Design
- 🎨 **Cards individuais** com hover effects e transições
- 📈 **Barras de progresso** animadas com cores por performance
- 🎯 **Cores dinâmicas** baseadas no valor das estatísticas
- ✨ **Escala visual** de 0 a 160 pontos com indicadores

## Scripts Disponíveis

```bash
npm run dev     # Servidor de desenvolvimento
npm run build   # Build para produção
npm run start   # Servidor de produção
npm run lint    # Verificação de código com Biome
npm run format  # Formatação de código com Biome
```

## Desenvolvimento

### Adicionando Novos Slices

1. Crie um novo arquivo em `src/slices/`
2. Use `createSlice` do Redux Toolkit
3. Adicione ao reducer no `store.ts`
4. Use os hooks `useAppDispatch` e `useAppSelector`

### Exemplo de Uso

```typescript
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchPokemonList } from '../slices/pokemonSlice';

function MyComponent() {
  const dispatch = useAppDispatch();
  const { pokemonList, loading, error } = useAppSelector(state => state.pokemon);

  useEffect(() => {
    dispatch(fetchPokemonList(20));
  }, [dispatch]);

  // ... resto do componente
}
```

## API

O projeto consome a [PokéAPI](https://pokeapi.co) para obter dados dos Pokémons. Todos os endpoints estão configurados em `src/api/api.ts`.

## Deploy

O projeto está configurado para deploy no Vercel. Execute:

```bash
npm run build
```

## Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto é open source e está disponível sob a [MIT License](LICENSE).
