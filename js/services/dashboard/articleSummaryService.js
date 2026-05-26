export function calculateArticleSummary(data) {

  const map = {};

  data.forEach(row => {

    const article =
      row.article_type || 'Unknown';

    if (!map[article]) {

      map[article] = {

        article,

        units: 0,

        gmv: 0
      };
    }

    map[article].units +=
      Number(row.total_units || 0);

    map[article].gmv +=
      Number(row.total_sales || 0);
  });

  return Object.values(map)
    .sort((a, b) => b.gmv - a.gmv);
}