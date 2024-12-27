export const formatDateString = (dateString: string): string => {
  const date = new Date(dateString);
  const month = date.getMonth();
  const day = date.getDate();
  const year = date.getFullYear();

  const formattedDate = new Date(year, month, day).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return formattedDate;
};
