import {
  HTMLAttributes,
  InputHTMLAttributes,
  PropsWithChildren,
  SelectHTMLAttributes
} from 'react';

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

  type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
    options: Option[];
    label?: string;
    placeholder?: string;
  };

  type Option = {
    label: string;
    value: string;
  };

  type Source = 'newsapi' | 'guardian' | 'nyt' | '';

  type Filters = {
    query?: string;
    date?: string;
    category?: string;
  };

  type News = {
    author: string;
    content: string;
    description: string;
    publishedAt: string;
    source: {
      id: string | null;
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
