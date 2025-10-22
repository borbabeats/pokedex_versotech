import { Box, Chip, Typography } from "@mui/material";
import React from "react";

interface AbilityProps {
  abilities: Array<{
    ability: {
      name: string;
    };
    is_hidden: boolean;
  }>;
}

export default function AbilityList({ abilities }: AbilityProps) {
  if (!abilities || abilities.length === 0) {
    return null;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 2,
        mb: 2,
      }}
    >
      <Typography
        variant="h6"
        component="h3"
        sx={{
          color: "white",
          mb: 1,
          fontWeight: "bold",
          textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
        }}
      >
        Habilidades:
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1,
          justifyContent: "center",
          maxWidth: "400px",
        }}
      >
        {abilities.map((ability) => (
          <Chip
            key={ability.ability.name}
            label={ability.ability.name.toUpperCase()}
            variant={ability.is_hidden ? "outlined" : "filled"}
            color={ability.is_hidden ? "secondary" : "primary"}
            sx={{
              backgroundColor: ability.is_hidden
                ? "rgba(255, 255, 255, 0.1)"
                : "#ff6b35",
              color: "white",
              border: ability.is_hidden ? "1px solid #ff6b35" : "none",
              fontWeight: "bold",
              fontSize: "0.75rem",
              "&:hover": {
                backgroundColor: ability.is_hidden
                  ? "rgba(255, 107, 53, 0.1)"
                  : "#e55a2b",
                transform: "scale(1.05)",
              },
              transition: "all 0.2s ease-in-out",
            }}
          />
        ))}
      </Box>
    </Box>
  );
}
