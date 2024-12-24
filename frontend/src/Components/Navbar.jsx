import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  Person as PersonIcon,
  BrowseGallery as BrowseIcon,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import "./Navbar.css";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <AppBar position="static" className="navbar">
      <Toolbar className="navbar-toolbar">
        {/* Logo */}
        <div className="navbar-logo">Logo</div>

        {isMobile ? (
          // Hamburger Menu for Mobile
          <IconButton edge="end" color="inherit" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
        ) : (
          <>
            {/* Home Icon */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <motion.div
                whileHover={{ scale: 1.2 }}
                className="navbar-home-icon-wrapper"
              >
                <HomeIcon className="navbar-home-icon" />
              </motion.div>

              {/* Search Bar */}
              <div className="navbar-search">
                <SearchIcon className="navbar-search-icon" />
                <InputBase
                  placeholder="What do you want to play?"
                  className="navbar-search-input"
                />
                <BrowseIcon className="navbar-browse-icon" />
              </div>
            </div>
            {/* Right Icons */}
            <div className="navbar-right-icons">
              <IconButton color="inherit">
                <NotificationsIcon />
              </IconButton>
              <IconButton color="inherit">
                <PersonIcon />
              </IconButton>
            </div>
          </>
        )}
      </Toolbar>

      {/* Drawer for Mobile */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <List className="navbar-drawer">
          <ListItem button>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Search" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Notifications" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Profile" />
          </ListItem>
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
