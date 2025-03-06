import { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import { X } from "lucide-react";
import styles from "../css/Home.module.css";

export default function SearchBar({ onSearch, items }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const searchRef = useRef(null);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim === "") {
      setSuggestions([]);
      return;
    }

    const filtered = items
      .filter((item) => item.title.toLowerCase().includes(value.toLowerCase()))
      .slice(0, 5);

    setSuggestions(filtered);
  };

  const handleSelect = (title) => {
    setQuery(title);
    setSuggestions([]);
    onSearch(title);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch(query);
      setSuggestions([]);
    }
  };

  const clearSearch = () => {
    setQuery("");
    setSuggestions([]);
    onSearch("");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSuggestions([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={searchRef} className={styles.searchContainer}>
      <div className={styles.searchBarContainer}>
        <span className={styles.iconContainer}>
          <Search size={20} strokeWidth={3} className={styles.searchIcon} />
        </span>
        <input
          className={styles.searchBar}
          type="text"
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Search..."
        />
        {query && (
          <button
            className={styles.searchClear}
            onClick={clearSearch}
            title="Clear search"
          >
            <X size={20} />
          </button>
        )}
      </div>
      <div className={styles.suggestionsContainer}>
        {suggestions.length > 0 && (
          <ul className={styles.suggestionsContainer}>
            {suggestions.map((item) => (
              <li
                className={styles.suggestion}
                key={item.id}
                onClick={() => handleSelect(item.title)}
              >
                {item.title}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
