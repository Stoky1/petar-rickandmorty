// src/app/characters/[characterId]/page.tsx

import { graphql } from '@/core/gql';
import { getQueryClient } from '@/core/query-client/utils';
import { getMetadata } from '@/core/seo/utils';
import { API_URL } from '@/core/shared/utils';
import { Card, CardTitle } from '@/core/ui/components/card';
import { CharacterDetails } from '@/features/characters/components/character-details';
import { DocumentNode } from 'graphql'; // Use DocumentNode instead of TypedDocumentNode
import { request } from 'graphql-request';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

// Define the GraphQL query with the correct types using DocumentNode
const CharacterPage_Query: DocumentNode = graphql(/* GraphQL */ `
  query CharacterPage_Query($id: ID!) {
    character(id: $id) {
      id
      name
      image
      ...CharacterDetails_CharacterFragment
    }
  }
`) as DocumentNode; // Cast the result of graphql to DocumentNode

type Character = {
  id: string;
  name: string;
  image: string;
  // Add more fields as per your GraphQL schema
};

type CharacterPageData = {
  character: Character | null;
};

async function getPageData(characterId: string): Promise<{ character: Character }> {
  const queryClient = getQueryClient();

  const data: CharacterPageData = await queryClient.fetchQuery({
    queryKey: ['character', characterId],
    queryFn: () =>
      request(API_URL, CharacterPage_Query, {
        id: characterId,
      }),
  });

  const { character } = data;

  if (!character) {
    notFound();
  }

  return { character };
}

type CharacterPageProps = {
  params: Promise<{
    characterId: string;
  }>;
};

export async function generateMetadata(
  props: CharacterPageProps,
): Promise<Metadata> {
  const { characterId } = await props.params;

  const { character } = await getPageData(characterId);

  return getMetadata({
    title: character.name,
    description: `Check out character details of "${character.name}" from Rick and Morty series.`,
    pathname: `/characters/${characterId}`,
    images:
      character.name && character.image
        ? [
            {
              url: character.image,
              alt: character.name,
            },
          ]
        : [],
  });
}

export default async function CharacterPage(props: CharacterPageProps) {
  const { characterId } = await props.params;

  const { character } = await getPageData(characterId);

  return (
    <main className="grid gap-2 md:grid-cols-[theme(spacing.80)_1fr]">
      <div className="mx-auto max-w-xs">
        <CharacterDetails character={character} />
      </div>
    </main>
  );
}
