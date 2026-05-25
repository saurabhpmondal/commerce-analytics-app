import {
  fetchDashboardMetrics
} from './services/supabase/analyticsService.js';

import { state }
from './core/state.js';

let rawData = [];

/* =========================
   INIT
========================= */

async function initializeApp() {

  rawData =
    await fetchDashboardMetrics();

  console.log(
    'Dashboard Metrics:',
    rawData
  );

  renderDashboard();
}

initializeApp();

/* =========================
   FILTER DATA
========================= */

function getFilteredData() {

  let filtered = [...rawData];

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

  /* ARTICLE TYPE */

  if (
    state.filters.articleType !==
    'All Article Types'
  ) {

    filtered = filtered.filter(
      row =>
        row.article_type ===
        state.filters.articleType
    );
  }

  /* ERP STATUS */

  if (
    state.filters.erpStatus !==
    'All Status'
  ) {

    filtered = filtered.filter(
      row =>
        row.erp_status ===
        state.filters.erpStatus
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

        String(row.style_id || '')
          .toLowerCase()
          .includes(search)

        ||

        String(row.erp_sku || '')
          .toLowerCase()
          .includes(search)
    );
  }

  return filtered;
}

/* =========================
   KPI CALCULATIONS
========================= */

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

    totalReturns:

      data.reduce(
        (sum, row) =>
          sum +
          Number(row.total_returns || 0),
        0
      ),

    sjitStock:

      data.reduce(
        (sum, row) =>
          sum +
          Number(row.sjit_stock || 0),
        0
      ),

    sorStock:

      data.reduce(
        (sum, row) =>
          sum +
          Number(row.sor_stock || 0),
        0
      ),

    avgRating:

      data.length

        ? (

          data.reduce(
            (sum, row) =>
              sum +
              Number(row.avg_rating || 0),
            0
          )

          / data.length

        ).toFixed(1)

        : '0'
  };
}

/* =========================
   BRAND SUMMARY
========================= */

function calculateBrandSummary(data) {

  const map = {};

  data.forEach(row => {

    const brand =
      row.brand || 'Unknown';

    if (!map[brand]) {

      map[brand] = {

        brand,

        units: 0,

        gmv: 0,

        sjit: 0,

        sor: 0
      };
    }

    map[brand].units +=
      Number(row.total_units || 0);

    map[brand].gmv +=
      Number(row.total_sales || 0);

    map[brand].sjit +=
      Number(row.sjit_stock || 0);

    map[brand].sor +=
      Number(row.sor_stock || 0);
  });

  return Object.values(map)
    .sort((a, b) => b.gmv - a.gmv);
}

/* =========================
   ARTICLE SUMMARY
========================= */

function calculateArticleSummary(data) {

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

/* =========================
   FILTER OPTIONS
========================= */

function getUniqueValues(key) {

  return [

    ...new Set(

      rawData
        .map(row => row[key])
        .filter(Boolean)

    )

  ].sort();
}

/* =========================
   RENDER
========================= */

function renderDashboard() {

  const data =
    getFilteredData();

  const kpis =
    calculateKPIs(data);

  const brandSummary =
    calculateBrandSummary(data);

  const articleSummary =
    calculateArticleSummary(data);

  const brands =
    getUniqueValues('brand');

  const articleTypes =
    getUniqueValues('article_type');

  const erpStatuses =
    getUniqueValues('erp_status');

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
              Marketplace Command Center
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
                    state.filters.brand ===
                    brand
                      ? 'selected'
                      : ''
                  }
                >
                  ${brand}
                </option>

              `).join('')}

            </select>

          </div>

          <!-- ERP STATUS -->

          <div class="filter-group">

            <label class="filter-label">
              ERP Status
            </label>

            <select
              id="erpStatusFilter"
              class="filter-control"
            >

              <option>
                All Status
              </option>

              ${erpStatuses.map(status => `

                <option
                  ${
                    state.filters.erpStatus ===
                    status
                      ? 'selected'
                      : ''
                  }
                >
                  ${status}
                </option>

              `).join('')}

            </select>

          </div>

          <!-- ARTICLE TYPE -->

          <div class="filter-group">

            <label class="filter-label">
              Article Type
            </label>

            <select
              id="articleTypeFilter"
              class="filter-control"
            >

              <option>
                All Article Types
              </option>

              ${articleTypes.map(type => `

                <option
                  ${
                    state.filters.articleType ===
                    type
                      ? 'selected'
                      : ''
                  }
                >
                  ${type}
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
                STYLE ID / ERP SKU
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
              Returns
            </div>

            <div class="kpi-value">
              ${Math.round(
                kpis.totalReturns
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

          <div class="card">

            <div class="kpi-title">
              Avg Rating
            </div>

            <div class="kpi-value">
              ${kpis.avgRating}
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

        <!-- BRAND SUMMARY -->

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

        <!-- ARTICLE SUMMARY -->

        <div
          class="card"
          style="margin-top:16px;"
        >

          <div class="section-title">
            Article Summary
          </div>

          <div class="table-wrapper">

            <table class="summary-table">

              <thead>

                <tr>

                  <th>Article Type</th>

                  <th>GMV</th>

                  <th>Units</th>

                  <th>ASP</th>

                </tr>

              </thead>

              <tbody>

                ${articleSummary.map(row => `

                  <tr>

                    <td>${row.article}</td>

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

/* =========================
   EVENTS
========================= */

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

        renderDashboard();
      }
    );

  /* ERP STATUS */

  document
    .getElementById(
      'erpStatusFilter'
    )
    .addEventListener(
      'change',
      e => {

        state.filters.erpStatus =
          e.target.value;

        renderDashboard();
      }
    );

  /* ARTICLE TYPE */

  document
    .getElementById(
      'articleTypeFilter'
    )
    .addEventListener(
      'change',
      e => {

        state.filters.articleType =
          e.target.value;

        renderDashboard();
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

        renderDashboard();

      }, 300)
    );
}

/* =========================
   DEBOUNCE
========================= */

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