/**
 * SearchBar component
 */

import React, { useState } from 'react';
import './SearchBar.css';
import Input from '../Input/Input';
import Button from '../Button/Button';

interface SearchBarProps {
    onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(query);
    };

    return (
        <form className="search-bar" onSubmit={handleSubmit}>
            <Input
                type="text"
                placeholder="Buscar productos..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="search-input"
            />
            <Button type="submit">Buscar</Button>
        </form>
    );
};

export default SearchBar;
