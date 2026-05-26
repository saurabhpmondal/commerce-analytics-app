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

  renderDashboardPage();
}

export function renderDashboardPage() {

  const data =
    getFilteredData(store.rawData);

  const kpis =
    calculateKPIs(data);

  const brandSummary =
    calculateBrandSummary(data);

  const articleSummary =
    calculateArticleSummary(data);

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

        ${renderDashboardKPIs(kpis)}

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