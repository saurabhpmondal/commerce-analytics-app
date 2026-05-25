import { supabase } from './client.js';

export async function fetchDashboardMetrics() {
  try {

    const { data, error } = await supabase
      .from('style_dashboard_metrics')
      .select('*')
      .limit(100);

    if (error) {
      console.error('Dashboard Metrics Error:', error);
      return [];
    }

    return data || [];

  } catch (err) {

    console.error(
      'Fetch Dashboard Metrics Failed:',
      err
    );

    return [];
  }
}