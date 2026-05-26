import { supabase }
from './client.js';

/* =========================
   SALES
========================= */

export async function fetchSalesData() {

  try {

    const { data, error } =
      await supabase

        .schema('reporting')

        .from('sales_all')

        .select(`
          order_date,
          style_id,
          brand,
          article_type,
          qty,
          final_amount
        `)

        .limit(50000);

    if (error) {

      console.error(
        'Sales Fetch Error:',
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
   RETURNS
========================= */

export async function fetchReturnsData() {

  try {

    const { data, error } =
      await supabase

        .schema('reporting')

        .from('returns_all')

        .select(`
          return_date,
          style_id,
          order_line_id
        `)

        .limit(50000);

    if (error) {

      console.error(
        'Returns Fetch Error:',
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
          article_type,
          erp_status
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
   FC STOCK
========================= */

export async function fetchFcStock() {

  try {

    const { data: latestDateData } =
      await supabase

        .schema('marketplace')

        .from('fc_stock')

        .select('date')

        .order('date', {
          ascending: false
        })

        .limit(1);

    const latestDate =
      latestDateData?.[0]?.date;

    if (!latestDate) {

      return [];
    }

    const { data, error } =
      await supabase

        .schema('marketplace')

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

    const { data: latestDateData } =
      await supabase

        .schema('marketplace')

        .from('ratings')

        .select('date')

        .order('date', {
          ascending: false
        })

        .limit(1);

    const latestDate =
      latestDateData?.[0]?.date;

    if (!latestDate) {

      return [];
    }

    const { data, error } =
      await supabase

        .schema('marketplace')

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