export function buildDashboardDataset({

  sales,

  returns,

  mapping,

  productMaster,

  fcStock,

  ratings
}) {

  /* =========================
     RETURNS MAP
  ========================= */

  const returnsMap = {};

  returns.forEach(row => {

    const styleId =
      String(row.style_id);

    if (!returnsMap[styleId]) {

      returnsMap[styleId] = 0;
    }

    returnsMap[styleId] += 1;
  });

  /* =========================
     STOCK MAP
  ========================= */

  const stockMap = {};

  fcStock.forEach(row => {

    const styleId =
      String(row.style_id);

    if (!stockMap[styleId]) {

      stockMap[styleId] = {

        sjit: 0,

        sor: 0
      };
    }

    const stockType =
      String(row.stock_type || '')
        .toUpperCase();

    if (stockType === 'SJIT') {

      stockMap[styleId].sjit +=
        Number(row.stock_units || 0);
    }

    if (stockType === 'SOR') {

      stockMap[styleId].sor +=
        Number(row.stock_units || 0);
    }
  });

  /* =========================
     RATINGS MAP
  ========================= */

  const ratingsMap = {};

  ratings.forEach(row => {

    ratingsMap[
      String(row.style_id)
    ] =
      Number(row.rating || 0);
  });

  /* =========================
     PRODUCT MASTER MAP
  ========================= */

  const productMap = {};

  productMaster.forEach(row => {

    productMap[
      String(row.erp_sku)
    ] = row;
  });

  /* =========================
     LISTING MAP
  ========================= */

  const mappingMap = {};

  mapping.forEach(row => {

    mappingMap[
      String(row.style_id)
    ] = row;
  });

  /* =========================
     FINAL DATASET
  ========================= */

  return sales.map(row => {

    const styleId =
      String(row.style_id);

    const listing =
      mappingMap[styleId] || {};

    const product =
      productMap[
        listing.erp_sku
      ] || {};

    const stock =
      stockMap[styleId] || {};

    return {

      order_date:
        row.order_date,

      style_id:
        styleId,

      erp_sku:
        listing.erp_sku || '',

      brand:
        row.brand ||
        listing.brand ||
        '',

      article_type:
        row.article_type ||
        listing.article_type ||
        '',

      erp_status:
        product.erp_status || '',

      total_units:
        Number(row.qty || 0),

      total_sales:
        Number(row.final_amount || 0),

      total_returns:
        returnsMap[styleId] || 0,

      sjit_stock:
        stock.sjit || 0,

      sor_stock:
        stock.sor || 0,

      avg_rating:
        ratingsMap[styleId] || 0
    };
  });
}