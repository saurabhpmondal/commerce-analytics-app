export function calculateBrandSummary(data) {

  const map = {};

  data.forEach(row => {

    const brand =
      row.brand || 'Unknown';

    if (!map[brand]) {

      map[brand] = {

        brand,

        units: 0,

        gmv: 0,

        sjit: 0,

        sor: 0
      };
    }

    map[brand].units +=
      Number(row.total_units || 0);

    map[brand].gmv +=
      Number(row.total_sales || 0);

    map[brand].sjit +=
      Number(row.sjit_stock || 0);

    map[brand].sor +=
      Number(row.sor_stock || 0);
  });

  return Object.values(map)
    .sort((a, b) => b.gmv - a.gmv);
}