import { fetchDashboardMetrics } from './services/supabase/analyticsService.js';

async function initializeApp() {

  console.log(
    'Commerce Analytics App Started'
  );

  const data =
    await fetchDashboardMetrics();

  console.log(
    'Dashboard Metrics:',
    data
  );

  const app =
    document.getElementById('app');

  app.innerHTML = `
    <div
      style="
        padding:20px;
        font-family:Arial;
      "
    >

      <h1>
        Commerce Analytics App
      </h1>

      <h2>
        Dashboard Metrics Loaded
      </h2>

      <p>
        Total Records: ${data.length}
      </p>

      <pre>
${JSON.stringify(data[0], null, 2)}
      </pre>

    </div>
  `;
}

initializeApp();