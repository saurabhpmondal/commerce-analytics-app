import {
  fetchDashboardMetrics
} from '../services/supabase/dashboardApi.js';

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

  store.rawData =
    await fetchDashboardMetrics();

  console.log(
    'Dashboard Data:',
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

      ${renderDashboardFilters(
        store.rawData
      )}

      <!-- CONTENT -->

      <main class="content">

        <!-- KPI -->

        ${renderDashboardKPIs(
          kpis
        )}

        <!-- TABS -->

        ${renderDashboardTabs()}

        <!-- BRAND -->

        ${renderBrandTable(
          brandSummary
        )}

        <!-- ARTICLE -->

        ${renderArticleTable(
          articleSummary
        )}

      </main>

    </div>
  `;

  attachDashboardEvents();
}