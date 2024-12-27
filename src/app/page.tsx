import { NextLink } from '@/core/routing/components/next-link';
import { Card, CardImage, CardTitle } from '@/core/ui/components/card';
import charactersPic from '@/features/images/characters.jpg';

export default function Home() {
  return (
    <main className="flex flex-col gap-12 py-24">
      <div className="flex flex-col gap-4 text-center"></div>

      <div className="flex flex-wrap justify-center gap-2">
        <NextLink
          key="/characters"
          href="/characters"
          className="fancy-border delay max-w-[21rem]"
        >
          <Card>
            <CardImage src={charactersPic} alt="Characters" priority />
            <CardTitle asChild className="text-xl">
              <h2>Characters</h2>
            </CardTitle>
          </Card>
        </NextLink>
      </div>
    </main>
  );
}
