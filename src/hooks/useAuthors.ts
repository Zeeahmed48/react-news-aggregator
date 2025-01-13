import { useEffect, useState } from 'react';

import { getGuradianAuthors, getNewsAPI } from '@/services';
import {
  transformGuardianContributorsToOptions,
  transformNewsApiArticlesToAuthorOptions
} from '@/utils';

const fetchAuthorsFromNewsApi = async (): Promise<Option[]> => {
  const { articles } = await getNewsAPI({ query: 'latest' });

  return transformNewsApiArticlesToAuthorOptions(articles);
};

const fetchAuthorsFromGuardian = async (): Promise<Option[]> => {
  const {
    response: { results: contributors }
  } = await getGuradianAuthors();

  return transformGuardianContributorsToOptions(contributors);
};

const useAuthors = ({ skip }: { skip?: boolean }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [authors, setAuthors] = useState<Option[]>([]);

  const fetchAuthors = async () => {
    try {
      setIsLoading(true);

      const [newsApiAuthors, guardianAuthors] = await Promise.all([
        fetchAuthorsFromNewsApi(),
        fetchAuthorsFromGuardian()
      ]);

      const combinedAuthors = [...newsApiAuthors, ...guardianAuthors];
      setAuthors(combinedAuthors);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (skip) return;
    fetchAuthors();
  }, [skip]);

  return {
    isLoading,
    error,
    authors
  };
};

export default useAuthors;
