import AddCircleIcon from "@mui/icons-material/AddCircle";
import AssessmentIcon from '@mui/icons-material/Assessment';
import HomeIcon from "@mui/icons-material/Home";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";
import { Link } from "react-router-dom";
import { inAdmin } from "../../utils/common";

const isAdmin = inAdmin()
export const mainListItems = (
  <React.Fragment>
    <Link to="/">
      <ListItemButton>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItemButton>
    </Link>

    {isAdmin && <Link to="/adminPage">
      <ListItemButton>
        <ListItemIcon>
          <AddCircleIcon />
        </ListItemIcon>
        <ListItemText primary="Admin Page" />
      </ListItemButton>
    </Link>}


  </React.Fragment>
);
