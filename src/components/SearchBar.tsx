
import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  onSearch: (searchTerm: string, category: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm, category);
  };

  const categories = [
    "All Categories",
    "Programming",
    "Design",
    "Business",
    "Marketing",
    "Data Science",
    "Personal Development"
  ];

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSearch} className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            type="text"
            placeholder="Search for courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full"
          />
        </div>
        
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat === "All Categories" ? "" : cat}>
              {cat}
            </option>
          ))}
        </select>
        
        <Button 
          type="submit" 
          className="bg-lms-primary hover:bg-lms-secondary transition-colors"
        >
          Search
        </Button>
      </form>
    </div>
  );
}
