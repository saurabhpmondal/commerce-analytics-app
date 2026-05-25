import {
  fetchDashboardMetrics
} from './services/supabase/analyticsService.js';

async function initializeApp() {

  const data =
    await fetchDashboardMetrics();

  console.log(
    'Dashboard Metrics:',
    data
  );

  const grossUnits =
    data.reduce(
      (sum, row) =>
        sum + Number(row.total_units || 0),
      0
    );

  const grossGMV =
    data.reduce(
      (sum, row) =>
        sum + Number(row.total_sales || 0),
      0
    );

  const sjitStock =
    data.reduce(
      (sum, row) =>
        sum + Number(row.total_fc_stock || 0),
      0
    );

  const sorStock =
    data.reduce(
      (sum, row) =>
        sum + Number(row.total_seller_stock || 0),
      0
    );

  /* BRAND SUMMARY */

  const brandMap = {};

  data.forEach(row => {

    if (!brandMap[row.brand]) {

      brandMap[row.brand] = {
        brand: row.brand,
        units: 0,
        gmv: 0,
        sjit: 0,
        sor: 0
      };
    }

    brandMap[row.brand].units +=
      Number(row.total_units || 0);

    brandMap[row.brand].gmv +=
      Number(row.total_sales || 0);

    brandMap[row.brand].sjit +=
      Number(row.total_fc_stock || 0);

    brandMap[row.brand].sor +=
      Number(row.total_seller_stock || 0);
  });

  const brandSummary =
    Object.values(brandMap);

  const app =
    document.getElementById('app');

  app.innerHTML = `

    <div class="app-layout">

      <!-- HEADER -->

      <header class="header">

        <div class="header-left">

          <div class="logo-circle">
            M
          </div>

          <div class="header-title">

            <div class="header-main">
              Myntra Commerce Analytics
            </div>

            <div class="header-sub">
              Marketplace Analytics Engine
            </div>

          </div>

        </div>

      </header>

      <!-- FILTER BAR -->

      <section class="filter-bar">

        <div class="filter-grid">

          <div class="filter-group">

            <label class="filter-label">
              Date Range
            </label>

            <select class="filter-control">

              <option>
                Yesterday
              </option>

              <option>
                This Week
              </option>

              <option>
                Last Week
              </option>

              <option selected>
                This Month
              </option>

              <option>
                Last Month
              </option>

            </select>

          </div>

          <div class="filter-group">

            <label class="filter-label">
              Brand
            </label>

            <select class="filter-control">

              <option>
                All Brands
              </option>

            </select>

          </div>

          <div class="filter-group">

            <label class="filter-label">
              ERP Status
            </label>

            <select class="filter-control">

              <option>
                All Status
              </option>

            </select>

          </div>

          <div class="filter-group">

            <label class="filter-label">
              Article Type
            </label>

            <select class="filter-control">

              <option>
                All Article Types
              </option>

            </select>

          </div>

          <div class="filter-group">

            <label class="filter-label">
              Search
            </label>

            <input
              class="filter-control"
              placeholder="
                STYLE ID / ERP SKU
              "
            />

          </div>

        </div>

      </section>

      <!-- KPI -->

      <main class="content">

        <div class="kpi-grid">

          <div class="card">

            <div class="kpi-title">
              Gross Units
            </div>

            <div class="kpi-value">
              ${Math.round(grossUnits)
                .toLocaleString()}
            </div>

          </div>

          <div class="card">

            <div class="kpi-title">
              Gross GMV
            </div>

            <div class="kpi-value">
              ₹${Math.round(grossGMV)
                .toLocaleString()}
            </div>

          </div>

          <div class="card">

            <div class="kpi-title">
              SJIT Stock
            </div>

            <div class="kpi-value">
              ${Math.round(sjitStock)
                .toLocaleString()}
            </div>

          </div>

          <div class="card">

            <div class="kpi-title">
              SOR Stock
            </div>

            <div class="kpi-value">
              ${Math.round(sorStock)
                .toLocaleString()}
            </div>

          </div>

        </div>

        <!-- TABS -->

        <div class="tabs-wrapper">

          <div class="tabs-bar">

            <button
              class="tab-btn active"
            >
              Dashboard
            </button>

            <button class="tab-btn">
              Sales
            </button>

            <button class="tab-btn">
              Returns
            </button>

            <button class="tab-btn">
              Inventory
            </button>

            <button class="tab-btn">
              Planning
            </button>

            <button class="tab-btn">
              Ratings
            </button>

          </div>

        </div>

        <!-- BRAND TABLE -->

        <div class="card">

          <div class="section-title">
            Brand Summary
          </div>

          <div class="table-wrapper">

            <table class="summary-table">

              <thead>

                <tr>

                  <th>Brand</th>

                  <th>GMV</th>

                  <th>Units</th>

                  <th>ASP</th>

                  <th>SJIT</th>

                  <th>SOR</th>

                </tr>

              </thead>

              <tbody>

                ${brandSummary.map(row => `

                  <tr>

                    <td>${row.brand}</td>

                    <td>
                      ₹${Math.round(row.gmv)
                        .toLocaleString()}
                    </td>

                    <td>
                      ${Math.round(row.units)
                        .toLocaleString()}
                    </td>

                    <td>
                      ₹${Math.round(
                        row.gmv /
                        (row.units || 1)
                      ).toLocaleString()}
                    </td>

                    <td>
                      ${Math.round(row.sjit)
                        .toLocaleString()}
                    </td>

                    <td>
                      ${Math.round(row.sor)
                        .toLocaleString()}
                    </td>

                  </tr>

                `).join('')}

              </tbody>

            </table>

          </div>

        </div>

      </main>

    </div>
  `;
}

initializeApp();