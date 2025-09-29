import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import HomeIcon from "@mui/icons-material/Home";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import CategoryIcon from "@mui/icons-material/Category";
import { LanguageContext } from "../context/AppContext";
import { translateCategory } from "../i18n";

const iconForCategory = (cat) => {
  switch (cat) {
    case "Food":
      return <FastfoodIcon />;
    case "Transport":
      return <DirectionsBusIcon />;
    case "Rent":
      return <HomeIcon />;
    case "Phone Recharge":
      return <PhoneIphoneIcon />;
    default:
      return <CategoryIcon />;
  }
};

const ExpenseList = ({ items }) => {
  const { language } = React.useContext(LanguageContext);
  return (
    <List>
      {items.map((e) => (
        <ListItem key={e.id} divider>
          <ListItemAvatar>
            <Avatar>
              {iconForCategory(e.category) || <ShoppingCartIcon />}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={`${e.name} — ${e.amount.toLocaleString("fr-DZ")} DA`}
            secondary={`${
              language === "ar"
                ? "الفئة"
                : language === "fr"
                ? "Catégorie"
                : "Category"
            }: ${translateCategory(language, e.category)} • ${e.date}`}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default ExpenseList;
