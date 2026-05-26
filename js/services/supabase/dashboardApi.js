import { supabase }
from './client.js';

/* =========================
   SALES
========================= */

export async function fetchSalesData() {

  try {

    const [

      currentResult,

      historicalResult

    ] = await Promise.all([

      supabase
        .schema('analytics')
        .from('sales_current')
        .select(`
          order_date,
          style_id,
          brand,
          article_type,
          qty,
          final_amount
        `)
        .limit(50000),

      supabase
        .schema('analytics')
        .from('sales_historical')
        .select(`
          order_date,
          style_id,
          brand,
          article_type,
          qty,
          final_amount
        `)
        .limit(50000)
    ]);

    if (
      currentResult.error ||
      historicalResult.error
    ) {

      console.error(
        'Sales Fetch Error:',
        currentResult.error ||
        historicalResult.error
      );

      return [];
    }

    return [

      ...(currentResult.data || []),

      ...(historicalResult.data || [])
    ];

  } catch (err) {

    console.error(err);

    return [];
  }
}

/* =========================
   RETURNS
========================= */

export async function fetchReturnsData() {

  try {

    const [

      currentResult,

      historicalResult

    ] = await Promise.all([

      supabase
        .schema('analytics')
        .from('returns_current')
        .select(`
          return_date,
          style_id,
          order_line_id
        `)
        .limit(50000),

      supabase
        .schema('analytics')
        .from('returns_historical')
        .select(`
          return_date,
          style_id,
          order_line_id
        `)
        .limit(50000)
    ]);

    if (
      currentResult.error ||
      historicalResult.error
    ) {

      console.error(
        'Returns Fetch Error:',
        currentResult.error ||
        historicalResult.error
      );

      return [];
    }

    return [

      ...(currentResult.data || []),

      ...(historicalResult.data || [])
    ];

  } catch (err) {

    console.error(err);

    return [];
  }
}

/* =========================
   LISTING MAPPING
========================= */

export async function fetchListingMapping() {

  try {

    const { data, error } =
      await supabase

        .schema('marketplace')

        .from('listing_mapping')

        .select(`
          style_id,
          erp_sku,
          brand,
          article_type
        `)

        .limit(50000);

    if (error) {

      console.error(
        'Mapping Fetch Error:',
        error
      );

      return [];
    }

    return data || [];

  } catch (err) {

    console.error(err);

    return [];
  }
}

/* =========================
   PRODUCT MASTER
========================= */

export async function fetchProductMaster() {

  try {

    const { data, error } =
      await supabase

        .schema('public')

        .from('product_master')

        .select(`
          erp_sku,
          erp_status,
          type,
          fabric,
          color,
          work
        `)

        .limit(50000);

    if (error) {

      console.error(
        'Product Master Fetch Error:',
        error
      );

      return [];
    }

    return data || [];

  } catch (err) {

    console.error(err);

    return [];
  }
}

/* =========================
   FC STOCK
========================= */

export async function fetchFcStock() {

  try {

    /* LATEST DATE */

    const latestResult =
      await supabase

        .schema('inventory')

        .from('fc_stock')

        .select('date')

        .order('date', {
          ascending: false
        })

        .limit(1);

    if (latestResult.error) {

      console.error(
        'FC Latest Date Error:',
        latestResult.error
      );

      return [];
    }

    const latestDate =
      latestResult
        ?.data?.[0]?.date;

    if (!latestDate) {

      return [];
    }

    /* STOCK FETCH */

    const { data, error } =
      await supabase

        .schema('inventory')

        .from('fc_stock')

        .select(`
          style_id,
          stock_type,
          stock_units
        `)

        .eq('date', latestDate)

        .limit(50000);

    if (error) {

      console.error(
        'FC Stock Fetch Error:',
        error
      );

      return [];
    }

    return data || [];

  } catch (err) {

    console.error(err);

    return [];
  }
}

/* =========================
   RATINGS
========================= */

export async function fetchRatings() {

  try {

    /* LATEST DATE */

    const latestResult =
      await supabase

        .schema('quality')

        .from('ratings')

        .select('date')

        .order('date', {
          ascending: false
        })

        .limit(1);

    if (latestResult.error) {

      console.error(
        'Ratings Latest Date Error:',
        latestResult.error
      );

      return [];
    }

    const latestDate =
      latestResult
        ?.data?.[0]?.date;

    if (!latestDate) {

      return [];
    }

    /* RATINGS FETCH */

    const { data, error } =
      await supabase

        .schema('quality')

        .from('ratings')

        .select(`
          style_id,
          rating
        `)

        .eq('date', latestDate)

        .limit(50000);

    if (error) {

      console.error(
        'Ratings Fetch Error:',
        error
      );

      return [];
    }

    return data || [];

  } catch (err) {

    console.error(err);

    return [];
  }
}