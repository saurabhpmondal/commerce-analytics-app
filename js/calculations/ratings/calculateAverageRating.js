export function calculateAverageRating(ratings){

  if(!ratings.length) return 0;

  const total = ratings.reduce((sum, item) => sum + Number(item.rating || 0), 0);

  return total / ratings.length;
}
