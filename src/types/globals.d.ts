import {
  ChangeEvent,
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

  type DatePickerProps = InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
  };

  type CheckboxProps = Option &
    InputHTMLAttributes<HTMLInputElement> & {
      checked?: boolean;
      onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    };

  interface CheckListProps {
    title?: string;
    list: Option[];
    selectedItems: string[];
    onSelectionChange: (updatedList: string[]) => void;
  }

  type Option = {
    label: string;
    value: string;
  };

  type Source = 'newsapi' | 'guardian' | 'nytimes' | '';

  type ApiSource = {
    id: string | null;
    name: string;
  };

  type Preferences = {
    selectedCategories: string[];
    selectedSources: Source[];
    selectedAuthors: string[];
  };

  type PreferencesProps = {
    authors: Option[];
    sources: Option[];
    categories: Option[];
    onSavePreferences: (preferences: Preferences) => void;
  };

  type Filters = {
    query?: string;
    date?: string;
    category?: string;
  };

  type PreferedFilters = { categories: string[]; authors: string[] };

  type NewsArticle = {
    title: string;
    description: string;
    imgUrl: string;
    url: string;
    publishedAt: string;
  };

  type News = {
    author?: string;
    content: string;
    description: string;
    publishedAt: string;
    source: ApiSource;
    title: string;
    url: string;
    urlToImage: string;
  };

  type GuardianNews = {
    id: string;
    type: string;
    sectionId: string;
    sectionName: string;
    webPublicationDate: string;
    webTitle: string;
    webUrl: string;
    apiUrl: string;
    isHosted: boolean;
    pillarId: string;
    pillarName: string;
    fields: {
      thumbnail: string;
    };
  };

  type NytNews = {
    abstract: string;
    web_url: string;
    snippet: string;
    lead_paragraph: string;
    print_section: string;
    print_page: string;
    source: string;
    pub_date: string;
    document_type: boolean;
    news_desk: string;
    section_name: string;
    type_of_material: string;
    _id: string;
    word_count: string;
    uri: string;
    multimedia: { url: string }[];
  };

  type GuardianAuthor = {
    id: string;
    type: string;
    webTitle: string;
    webUrl: string;
    apiUrl: string;
    bio: string;
  };

  type NewsResponse = {
    status: string;
    totalResults: number;
    articles: News[];
  };

  type GuardianResponse = {
    response: {
      status: string;
      total: number;
      results: GuardianNews[];
    };
  };

  type NytResponse = {
    status: string;
    response: {
      docs: NytNews[];
    };
  };

  type GuardianAuthorsResponse = {
    response: {
      status: string;
      total: number;
      results: GuardianAuthor[];
    };
  };
}
