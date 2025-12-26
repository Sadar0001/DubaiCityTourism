import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function SearchGroup() {
  return (
    <div className="flex items-center space-x-2">
      <Input className="flex flex-auto" type="text" placeholder="Search..." />
      <Button
        type="submit"
        variant="outline"
        className="bg-teal-500 text-white  hover:bg-black hover:text-white  transition duration-300 transform hover:translate-x-2 hover:translate-y-0.5"
      >
        <Search />
      </Button>
    </div>
  );
}

