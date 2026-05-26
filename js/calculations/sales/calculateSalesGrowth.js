export function calculateSalesGrowth(current, previous){

  if(!previous) return 0;

  return ((current - previous) / previous) * 100;
}
