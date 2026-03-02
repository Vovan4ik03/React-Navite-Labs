export const generateNews = (count, startId = 0) => {
  return Array.from({ length: count }).map((_, i) => {
    const id = startId + i;
    return {
      id: id.toString(),
      title: `Новина ${id + 1}`,
      description:
        "Опис данної новини",
      image: `https://picsum.photos/seed/news_${id}/600/360`,
    };
  });
};