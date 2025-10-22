import React, { useState } from "react";
import ProfileInfo from "../Cards/ProfileInfo";
import { useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";

const Navbar = ({ userInfo, onSearchNote, handleClearSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleSearch = () => {
    if (searchQuery) {
      onSearchNote(searchQuery);
    }
  };

  const onClearSearch = () => {
    setSearchQuery("");
    handleClearSearch();
  };

  return (
    <nav className="bg-gradient-to-r from-[#8EC5FC] to-[#E0C3FC] shadow-md backdrop-blur-sm px-8 py-3 flex items-center justify-between rounded-b-2xl border-b border-white/20 sticky top-0 z-50">
      {/* Logo / Title */}
      <h2 className="text-2xl font-semibold text-white drop-shadow-sm tracking-wide">
        ✨ MyNotes
      </h2>

      {/* Search bar */}
      <div className="flex-1 flex justify-center mx-10">
        <div className="w-full max-w-md">
          <SearchBar
            value={searchQuery}
            onChange={({ target }) => setSearchQuery(target.value)}
            handleSearch={handleSearch}
            onClearSearch={onClearSearch}
          />
        </div>
      </div>

      {/* Profile Section */}
      <div className="flex items-center gap-3">
        <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
      </div>
    </nav>
  );
};

export default Navbar;
