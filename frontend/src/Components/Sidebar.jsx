import React, { useState, useRef, useCallback, useEffect } from "react";
import "./Sidebar.css";
import LayersIcon from "@mui/icons-material/Layers";
import AddIcon from "@mui/icons-material/Add";
import EastIcon from "@mui/icons-material/East";
import { Chip } from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import SearchIcon from "@mui/icons-material/Search";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";

const Sidebar = () => {
  const sidebarRef = useRef(null);
  const [isResizing, setIsResizing] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(368);
  const [search, setSearch] = useState("");

  const startResizing = useCallback(() => {
    setIsResizing(true);
  }, []);

  const stopResizing = useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = useCallback(
    (mouseMoveEvent) => {
      if (isResizing) {
        const newWidth =
          mouseMoveEvent.clientX -
          sidebarRef.current.getBoundingClientRect().left;
        if (newWidth >= 355) {
          // Allow resizing only if the width is above the minimum limit
          setSidebarWidth(newWidth);
        }
      }
    },
    [isResizing]
  );

  useEffect(() => {
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResizing);
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [resize, stopResizing]);

  useEffect(() => {
    if (sidebarWidth < 355) {
      stopResizing();
    }
  }, [sidebarWidth, stopResizing]);

  const handlePlaylistChipClicked = () => {
    console.info("You clicked the Chip.");
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const RecentlyPlayed = () => {
    return (
      <div className="recently-played">
        <div className="content-container">
          <div className="image-container">
            <img
              className="recently-played-image"
              src="https://images.unsplash.com/photo-1734881368192-b71a88293b78?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
            <PlayCircleIcon className="play-button" />
          </div>
          <div>
            <h3>Liked Songs</h3>
            <div style={{ display: "flex", alignItems: "center" }}>
              <p>Playlist</p>
              <p>•</p>
              <p>ShreyashKatare</p>
            </div>
          </div>
        </div>
        <div className="overlay"></div>
      </div>
    );
  };

  return (
    <div
      ref={sidebarRef}
      className="sidebar-container"
      style={{ width: sidebarWidth }}
      // onMouseDown={(e) => e.preventDefault()}
    >
      <div className="sidebar-content">
        {/* Section 1: Library with icons */}
        <div>
          <div className="library-section">
            <div className="library-title">
              <LayersIcon style={{ marginRight: "10px" }} />
              <h3>Your Library</h3>
            </div>

            <div className="library-icons">
              <AddIcon style={{ marginRight: "20px" }} />
              <EastIcon />
            </div>
          </div>
        </div>
        {/* Section 2: Playlists with chip UI and search */}
        <div className="sidebar-content">
          <Chip
            label="Playlists"
            onClick={handlePlaylistChipClicked}
            sx={{ color: "#fff", backgroundColor: "#888" }}
          />
        </div>
        {/* Section 3: Titles with columns */}
        <div className="sidebar-content-search">
          <div className="sidebar-search">
            <SearchIcon style={{ color: "#888" }} />
            <input
              value={search}
              type="text"
              placeholder="Search in your Library"
              onChange={(e) => handleSearchChange(e)}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h4>Recents</h4>
            <SortIcon />
          </div>
        </div>
        {/* Section 4: Recently Played */}
        <div>
          {[1, 2, 3, 4, 5].map((item) => (
            <RecentlyPlayed key={item} />
          ))}
        </div>
      </div>
      <div className="sidebar-resizer" onMouseDown={startResizing} />
    </div>
  );
};

export default Sidebar;
