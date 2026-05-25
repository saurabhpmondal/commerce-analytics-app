import {
  fetchDashboardMetrics
} from './services/supabase/analyticsService.js';

import { state }
from './core/state.js';

let rawData = [];

async function initializeApp() {

  rawData =
    await fetchDashboardMetrics();

  console.log(
    'Dashboard Metrics:',
    rawData
  );

  renderApp();
}

/* FILTER LOGIC */

function getFilteredData() {

  let filtered =
    [...rawData];

  /* BRAND */

  if (
    state.filters.brand !==
    'All Brands'
  ) {

    filtered = filtered.filter(
      row =>
        row.brand ===
        state.filters.brand
    );
  }

  /* SEARCH */

  if (
    state.filters.search.trim()
  ) {

    const search =
      state.filters.search
        .toLowerCase();

    filtered = filtered.filter(
      row =>

        String(row.style_id)
          .toLowerCase()
          .includes(search)

        ||

        String(row.brand)
          .toLowerCase()
          .includes(search)
    );
  }

  return filtered;
}

/* KPI CALCULATIONS */

function calculateKPIs(data) {

  return {

    grossUnits:
      data.reduce(
        (sum, row) =>
          sum +
          Number(row.total_units || 0),
        0
      ),

    grossGMV:
      data.reduce(
        (sum, row) =>
          sum +
          Number(row.total_sales || 0),
        0
      ),

    sjitStock:
      data.reduce(
        (sum, row) =>
          sum +
          Number(
            row.total_fc_stock || 0
          ),
        0
      ),

    sorStock:
      data.reduce(
        (sum, row) =>
          sum +
          Number(
            row.total_seller_stock || 0
          ),
        0
      )
  };
}

/* BRAND SUMMARY */

function calculateBrandSummary(data) {

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
      Number(
        row.total_seller_stock || 0
      );
  });

  return Object.values(brandMap);
}

/* RENDER */

function renderApp() {

  const data =
    getFilteredData();

  const kpis =
    calculateKPIs(data);

  const brandSummary =
    calculateBrandSummary(data);

  const brands =
    [
      ...new Set(
        rawData.map(row => row.brand)
      )
    ];

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

      <!-- FILTERS -->

      <section class="filter-bar">

        <div class="filter-grid">

          <!-- DATE -->

          <div class="filter-group">

            <label class="filter-label">
              Date Range
            </label>

            <select
              id="dateFilter"
              class="filter-control"
            >

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

          <!-- BRAND -->

          <div class="filter-group">

            <label class="filter-label">
              Brand
            </label>

            <select
              id="brandFilter"
              class="filter-control"
            >

              <option>
                All Brands
              </option>

              ${brands.map(brand => `

                <option
                  ${
                    brand ===
                    state.filters.brand
                    ? 'selected'
                    : ''
                  }
                >
                  ${brand}
                </option>

              `).join('')}

            </select>

          </div>

          <!-- SEARCH -->

          <div class="filter-group">

            <label class="filter-label">
              Search
            </label>

            <input
              id="searchFilter"

              class="filter-control"

              placeholder="
                STYLE ID / BRAND
              "

              value="
                ${state.filters.search}
              "
            />

          </div>

        </div>

      </section>

      <!-- CONTENT -->

      <main class="content">

        <!-- KPI -->

        <div class="kpi-grid">

          <div class="card">

            <div class="kpi-title">
              Gross Units
            </div>

            <div class="kpi-value">
              ${Math.round(
                kpis.grossUnits
              ).toLocaleString()}
            </div>

          </div>

          <div class="card">

            <div class="kpi-title">
              Gross GMV
            </div>

            <div class="kpi-value">
              ₹${Math.round(
                kpis.grossGMV
              ).toLocaleString()}
            </div>

          </div>

          <div class="card">

            <div class="kpi-title">
              SJIT Stock
            </div>

            <div class="kpi-value">
              ${Math.round(
                kpis.sjitStock
              ).toLocaleString()}
            </div>

          </div>

          <div class="card">

            <div class="kpi-title">
              SOR Stock
            </div>

            <div class="kpi-value">
              ${Math.round(
                kpis.sorStock
              ).toLocaleString()}
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
                      ₹${Math.round(
                        row.gmv
                      ).toLocaleString()}
                    </td>

                    <td>
                      ${Math.round(
                        row.units
                      ).toLocaleString()}
                    </td>

                    <td>
                      ₹${Math.round(
                        row.gmv /
                        (row.units || 1)
                      ).toLocaleString()}
                    </td>

                    <td>
                      ${Math.round(
                        row.sjit
                      ).toLocaleString()}
                    </td>

                    <td>
                      ${Math.round(
                        row.sor
                      ).toLocaleString()}
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

  attachEvents();
}

/* EVENTS */

function attachEvents() {

  /* BRAND */

  document
    .getElementById(
      'brandFilter'
    )
    .addEventListener(
      'change',
      e => {

        state.filters.brand =
          e.target.value;

        renderApp();
      }
    );

  /* SEARCH */

  document
    .getElementById(
      'searchFilter'
    )
    .addEventListener(
      'input',
      debounce(e => {

        state.filters.search =
          e.target.value;

        renderApp();

      }, 300)
    );
}

/* DEBOUNCE */

function debounce(fn, delay) {

  let timeout;

  return (...args) => {

    clearTimeout(timeout);

    timeout = setTimeout(
      () => fn(...args),
      delay
    );
  };
}

initializeApp();