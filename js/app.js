import { fetchDashboardMetrics }
from './services/supabase/analyticsService.js';

async function initializeApp() {

  const data =
    await fetchDashboardMetrics();

  console.log(
    'Dashboard Metrics:',
    data
  );

  const totalSales =
    data.reduce(
      (sum, row) =>
        sum + Number(row.total_sales || 0),
      0
    );

  const totalUnits =
    data.reduce(
      (sum, row) =>
        sum + Number(row.total_units || 0),
      0
    );

  const totalReturns =
    data.reduce(
      (sum, row) =>
        sum + Number(row.total_returns || 0),
      0
    );

  const avgRating =
    (
      data.reduce(
        (sum, row) =>
          sum + Number(row.avg_rating || 0),
        0
      ) / data.length
    ).toFixed(2);

  const app =
    document.getElementById('app');

  app.innerHTML = `

    <div class="app-layout">

      <!-- SIDEBAR -->

      <aside class="sidebar">

        <div class="sidebar-logo">
          Commerce Analytics
        </div>

        <div class="sidebar-menu">

          <div class="sidebar-item active">
            Dashboard
          </div>

          <div class="sidebar-item">
            Sales
          </div>

          <div class="sidebar-item">
            Returns
          </div>

          <div class="sidebar-item">
            Inventory
          </div>

          <div class="sidebar-item">
            Planning
          </div>

          <div class="sidebar-item">
            Ratings
          </div>

        </div>

      </aside>

      <!-- MAIN -->

      <div class="main-layout">

        <!-- HEADER -->

        <header class="header">

          <div class="header-title">
            Commerce Analytics App
          </div>

        </header>

        <!-- CONTENT -->

        <main class="content">

          <!-- KPI -->

          <div class="kpi-grid">

            <div class="card">

              <div class="kpi-title">
                Total Sales
              </div>

              <div class="kpi-value">
                ₹${Math.round(totalSales).toLocaleString()}
              </div>

            </div>

            <div class="card">

              <div class="kpi-title">
                Total Units
              </div>

              <div class="kpi-value">
                ${Math.round(totalUnits).toLocaleString()}
              </div>

            </div>

            <div class="card">

              <div class="kpi-title">
                Total Returns
              </div>

              <div class="kpi-value">
                ${Math.round(totalReturns).toLocaleString()}
              </div>

            </div>

            <div class="card">

              <div class="kpi-title">
                Average Rating
              </div>

              <div class="kpi-value">
                ${avgRating}
              </div>

            </div>

          </div>

          <!-- TABLE -->

          <div class="card">

            <div class="section-title">
              Dashboard Metrics
            </div>

            <table class="dashboard-table">

              <thead>

                <tr>

                  <th>Style ID</th>

                  <th>Brand</th>

                  <th>Article Type</th>

                  <th>Sales</th>

                  <th>Units</th>

                  <th>Returns</th>

                  <th>Stock</th>

                  <th>Rating</th>

                </tr>

              </thead>

              <tbody>

                ${data.map(row => `

                  <tr>

                    <td>${row.style_id}</td>

                    <td>${row.brand}</td>

                    <td>${row.article_type}</td>

                    <td>₹${Math.round(row.total_sales || 0)}</td>

                    <td>${row.total_units}</td>

                    <td>${row.total_returns}</td>

                    <td>${row.total_stock}</td>

                    <td>${row.avg_rating}</td>

                  </tr>

                `).join('')}

              </tbody>

            </table>

          </div>

        </main>

      </div>

    </div>
  `;
}

initializeApp();