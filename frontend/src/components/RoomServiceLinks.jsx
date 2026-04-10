import { Link } from "react-router-dom";
import { roomServiceCategories } from "../data/hotel";

const RoomServiceLinks = () => {
  const activeCategories = roomServiceCategories.filter((c) => c.active);
  
  return (
    <ul className="space-y-2 text-sm">
      {activeCategories.map((category) => (
        <li key={category.id}>
          <Link 
            to="/room-service" 
            state={{ category: category.id }}
            className="hover:text-white transition"
          >
            {category.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default RoomServiceLinks;
