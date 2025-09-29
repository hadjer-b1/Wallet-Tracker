import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import WorkIcon from "@mui/icons-material/Work";
import PaymentsIcon from "@mui/icons-material/Payments";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { LanguageContext } from "../context/AppContext";

const iconForSource = (source) => {
  switch (source) {
    case "salary":
      return <WorkIcon />;
    case "freelance":
      return <PaymentsIcon />;
    case "gift":
      return <VolunteerActivismIcon />;
    default:
      return <MonetizationOnIcon />;
  }
};

const IncomeList = ({ items = [] }) => {
  const { language } = React.useContext(LanguageContext);

  if (!items.length) {
    return (
      <List>
        <ListItem>
          <ListItemText
            primary={
              language === "ar"
                ? "لا يوجد دخل مضاف"
                : language === "fr"
                ? "Aucun revenu ajouté"
                : "No income added"
            }
          />
        </ListItem>
      </List>
    );
  }

  return (
    <List>
      {items.map((income, idx) => (
        <ListItem key={idx} divider>
          <ListItemAvatar>
            <Avatar>{iconForSource(income.source)}</Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={`${income.amount.toLocaleString("fr-DZ")} DA`}
            secondary={`${income.source} • ${new Date(
              income.date
            ).toLocaleDateString()}`}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default IncomeList;
