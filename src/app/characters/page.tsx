import { useState, useEffect, useRef } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CHARACTERS } from '@/queries/characters'; // Apollo GraphQL query for fetching characters
import { Card, CardTitle } from '@/core/ui/components/card';
import { CharacterSearchForm } from '@/features/characters/components/character-search-form';
import { apolloClient } from '@/lib/apolloClient'; // Apollo Client setup

const CharactersPage = ({ searchParams }: { searchParams: any }) => {
  const [page, setPage] = useState(1); // State to track the current page
  const { keyword } = searchParams; // Extract search keyword if any
  const { data, loading, error, fetchMore } = useQuery(GET_CHARACTERS, {
    client: apolloClient,
    variables: { page, keyword }, // Fetch characters for the current page
  });

  // Explicitly typing the loaderRef to HTMLDivElement
  const loaderRef = useRef<HTMLDivElement>(null); // Reference for scroll trigger

  useEffect(() => {
    const handleScroll = () => {
      if (loaderRef.current) {
        const { bottom } = loaderRef.current.getBoundingClientRect();
        if (bottom <= window.innerHeight && !loading && data?.characters?.info?.next) {
          // Trigger fetching more characters when reaching the bottom
          setPage((prevPage) => prevPage + 1);
        }
      }
    };

    // Attach the scroll event listener
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll); // Cleanup
  }, [loading, data]);

  useEffect(() => {
    if (page > 1) {
      fetchMore({
        variables: { page, keyword },
      });
    }
  }, [page, fetchMore, keyword]);

  if (loading && page === 1) return <p>Loading...</p>; // Loading state
  if (error) return <p>Error: {error.message}</p>; // Error handling

  return (
    <main className="flex flex-col gap-2">
      <Card>
        <CardTitle className="text-2xl">Characters</CardTitle>
        <div className="flex flex-col gap-4">
          <CharacterSearchForm />
          {keyword && (
            <p className="text-muted-foreground">
              Search results for{' '}
              <span className="font-semibold text-foreground">
                &quot;{keyword}&quot;
              </span>
            </p>
          )}
        </div>
      </Card>

      <div className="character-list">
        {data?.characters?.results.map((character: any) => (
          <div key={character.id} className="card">
            <img src={character.image} alt={character.name} className="card-image" />
            <div className="card-content">
              <h3>{character.name}</h3>
              <p>{character.status} - {character.species}</p>
              <p>{character.origin.name}</p>
            </div>
          </div>
        ))}
      </div>

      {loading && page > 1 && <p>Loading more...</p>} {/* Show loading indicator for subsequent pages */}

      {/* Scroll trigger */}
      <div ref={loaderRef} />
    </main>
  );
};

export default CharactersPage;
