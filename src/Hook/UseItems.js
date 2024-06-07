import { useEffect, useState } from "react";
// fetch items
const UseItems = (id) => {
    const [items, setItems] = useState({});
    useEffect(() => {
      const fetchItems = async () => {
        try {
          const response = await fetch(`http://localhost:8000/product/${id}`);
          if (!response.ok) {
            throw new Error("Failed to fetch items");
          }
          const data = await response.json();
          console.log("Fetched items:", data);
          setItems(data);
        } catch (error) {
          console.error("Error fetching items:", error);
        }
      };
  // error fetch
      fetchItems();
    }, [id]);
  
    return items;
  };
  
  export default UseItems;

  // Use Item