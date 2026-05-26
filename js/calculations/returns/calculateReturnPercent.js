export function calculateReturnPercent(returnUnits, soldUnits){

  if(!soldUnits) return 0;

  return (returnUnits / soldUnits) * 100;
}
