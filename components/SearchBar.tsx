import { useState } from 'react';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

type SearchBarProps = {
  onSearch: (query: string) => void;
};

export function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies..."
        className="flex-grow"
      />
      <Button type="submit">Search</Button>
    </form>
  );
}

