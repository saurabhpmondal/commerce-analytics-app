import {

  fetchSalesData,

  fetchReturnsData,

  fetchListingMapping,

  fetchFcStock,

  fetchRatings

} from '../services/supabase/dashboardApi.js';

import {
  buildDashboardDataset
} from '../services/supabase/transformService.js';

import { store }
from '../core/store.js';

import {
  getFilteredData
} from '../services/dashboard/filterService.js';

import {
  calculateKPIs
} from '../services/dashboard/kpiService.js';

import {
  calculateBrandSummary
} from '../services/dashboard/brandSummaryService.js';

import {
  calculateArticleSummary
} from '../services/dashboard/articleSummaryService.js';

import {
  renderDashboardFilters
} from './dashboardFilters.js';

import {
  renderDashboardKPIs
} from './dashboardKPIs.js';

import {
  renderDashboardTabs
} from './dashboardTabs.js';

import {
  renderBrandTable
} from './dashboardBrandTable.js';

import {
  renderArticleTable
} from './dashboardArticleTable.js';

import {
  attachDashboardEvents
} from './dashboardEvents.js';

export async function initializeDashboardPage() {

  const [

    sales,

    returns,

    mapping,

    fcStock,

    ratings

  ] = await Promise.all([

    fetchSalesData(),

    fetchReturnsData(),

    fetchListingMapping(),

    fetchFcStock(),

    fetchRatings()
  ]);

  store.sales = sales;

  store.returns = returns;

  store.mapping = mapping;

  store.fcStock = fcStock;

  store.ratings = ratings;

  store.rawData =
    buildDashboardDataset({

      sales,

      returns,

      mapping,

      fcStock,

      ratings
    });

  console.log(
    'Dashboard Dataset:',
    store.rawData
  );

  renderDashboardPage();
}

export function renderDashboardPage() {

  const filteredData =
    getFilteredData(
      store.rawData
    );

  const kpis =
    calculateKPIs(
      filteredData
    );

  const brandSummary =
    calculateBrandSummary(
      filteredData
    );

  const articleSummary =
    calculateArticleSummary(
      filteredData
    );

  const app =
    document.getElementById('app');

  app.innerHTML = `

    <div class="app-layout">

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

      ${renderDashboardFilters(
        store.rawData
      )}

      <main class="content">

        ${renderDashboardKPIs(
          kpis
        )}

        ${renderDashboardTabs()}

        ${renderBrandTable(
          brandSummary
        )}

        ${renderArticleTable(
          articleSummary
        )}

      </main>

    </div>
  `;

  attachDashboardEvents();
}