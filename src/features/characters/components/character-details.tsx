// src/features/characters/components/character-details.tsx
import { Character } from '@/features/characters/components/types';  // Import the Character type

type CharacterDetailsProps = {
  character: Character;
};

export function CharacterDetails({ character }: CharacterDetailsProps) {
  return (
    <div>
      <h2>{character.name}</h2>
      <img src={character.image} alt={character.name} />
      {/* Add more details as needed */}
    </div>
  );
}
