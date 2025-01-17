import { FC, ReactElement, SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';

import { Card } from '@/components';
import { formatDateString } from '@/utils';
import { no_image_placeholder } from '@/constants';

import './style.css';

const NewsCard: FC<NewsArticle> = ({
  title,
  description,
  imgUrl,
  url,
  publishedAt
}): ReactElement => {
  const handleImageError = (
    event: SyntheticEvent<HTMLImageElement, Event>
  ): void => {
    event.currentTarget.src = no_image_placeholder; // replace corrupt image with the placeholder image
  };

  return (
    <Card className="news-card">
      <img
        className="news-image"
        src={imgUrl ?? no_image_placeholder}
        alt={title}
        onError={handleImageError}
      />
      <div className="news-content">
        <div className="news-link-container">
          <Link to={url} target="_blank" className="news-link">
            {title}
          </Link>
        </div>
        <p className="news-description">{description}</p>
        <p className="news-date">{formatDateString(publishedAt)}</p>
      </div>
    </Card>
  );
};

export default NewsCard;
