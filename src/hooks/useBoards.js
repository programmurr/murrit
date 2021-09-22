import { useState, useEffect } from "react";
import { getBoards } from "../firebase";

export default function useBoards() {
  const [boards, setBoards] = useState([]);
  useEffect(() => {
    getBoards()
      .then((fetchedBoards) => {
        setBoards(fetchedBoards.sort());
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const updateBoards = (updatedBoards) => {
    setBoards(updatedBoards);
  }

  return {
    boards,
    update: updateBoards
  }
}