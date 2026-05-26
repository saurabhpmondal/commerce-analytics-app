import { supabase }
from './client.js';

export async function fetchDashboardMetrics() {

  try {

    const { data, error } =
      await supabase

        .schema('reporting')

        .from(
          'style_dashboard_metrics'
        )

        .select('*')

        .limit(5000);

    if (error) {

      console.error(error);

      return [];
    }

    return data || [];

  } catch (err) {

    console.error(err);

    return [];
  }
}