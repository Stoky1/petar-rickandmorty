import { Loading } from '@/core/ui/components/loading';
import useInfiniteScroll from 'react-infinite-scroll-hook';

type InfiniteScrollSentryProps = Pick<
  Parameters<typeof useInfiniteScroll>[0],
  'hasNextPage' | 'loading' | 'onLoadMore'
>;

export function InfiniteScrollSentry({
  hasNextPage,
  loading,
  onLoadMore,
}: InfiniteScrollSentryProps) {
  const [sentryRef] = useInfiniteScroll({
    hasNextPage,
    loading,
    onLoadMore,
    rootMargin: '0px 0px 400px 0px',
  });

  if (!hasNextPage) {
    return null;
  }


  return <Loading ref={sentryRef} />;
}
