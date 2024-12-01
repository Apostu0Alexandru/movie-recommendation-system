import { useState, useEffect } from 'react';
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { getAllGenres } from '@/lib/api';

interface GenreFilterProps {
  onFilterChange: (selectedGenres: string[]) => void;
}

export function GenreFilter({ onFilterChange }: GenreFilterProps) {
  const [genres, setGenres] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  useEffect(() => {
    setGenres(getAllGenres());
  }, []);

  const handleGenreChange = (genre: string) => {
    const updatedGenres = selectedGenres.includes(genre)
      ? selectedGenres.filter(g => g !== genre)
      : [...selectedGenres, genre];
    setSelectedGenres(updatedGenres);
    onFilterChange(updatedGenres);
  };

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold mb-2">Filter by Genre</h3>
      {genres.map(genre => (
        <div key={genre} className="flex items-center space-x-2">
          <Checkbox
            id={genre}
            checked={selectedGenres.includes(genre)}
            onCheckedChange={() => handleGenreChange(genre)}
          />
          <Label htmlFor={genre}>{genre}</Label>
        </div>
      ))}
    </div>
  );
}

