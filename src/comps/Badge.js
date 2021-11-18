import * as React from "react";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useGlobalContext } from "../context";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -6,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

export default function CustomizedBadges() {
  const { watchListDatas } = useGlobalContext();
  return (
    <IconButton aria-label="cart">
      <StyledBadge
        badgeContent={watchListDatas.length}
        style={{ color: "gold" }}
      >
        <ShoppingCartIcon />
      </StyledBadge>
    </IconButton>
  );
}
