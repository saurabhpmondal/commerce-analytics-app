export function calculateKPIs(data) {

  return {

    grossUnits:

      data.reduce(
        (sum, row) =>
          sum +
          Number(row.total_units || 0),
        0
      ),

    grossGMV:

      data.reduce(
        (sum, row) =>
          sum +
          Number(row.total_sales || 0),
        0
      ),

    totalReturns:

      data.reduce(
        (sum, row) =>
          sum +
          Number(row.total_returns || 0),
        0
      ),

    sjitStock:

      data.reduce(
        (sum, row) =>
          sum +
          Number(row.sjit_stock || 0),
        0
      ),

    sorStock:

      data.reduce(
        (sum, row) =>
          sum +
          Number(row.sor_stock || 0),
        0
      ),

    avgRating:

      data.length

        ? (

          data.reduce(
            (sum, row) =>
              sum +
              Number(row.avg_rating || 0),
            0
          )

          / data.length

        ).toFixed(1)

        : '0'
  };
}