export function calculateStockCover(stock, avgSales){

  if(!avgSales) return 0;

  return stock / avgSales;
}
