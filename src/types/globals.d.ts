import { HTMLAttributes, InputHTMLAttributes, PropsWithChildren } from 'react';

declare global {
  type ContainerProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>>;

  type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    variant?: 'primary-light-contained' | 'white-bordered';
    renderLeftIcon?: () => ReactElement | null;
    renderRightIcon?: () => ReactElement | null;
  };

  type CardProps = PropsWithChildren<
    HTMLAttributes<HTMLDivElement> & { variant?: 'primary-bordered' }
  >;

  type News = {
    author: string;
    content: string;
    description: string;
    publishedAt: string;
    source: {
      id: string;
      name: string;
    };
    title: string;
    url: string;
    urlToImage: string;
  };

  type NewsResponse = {
    status: string;
    totalResults: number;
    articles: News[];
  };
}
