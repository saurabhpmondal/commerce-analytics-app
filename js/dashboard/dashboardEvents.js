import { state }
from '../core/state.js';

import { debounce }
from '../core/debounce.js';

import {
  renderDashboardPage
} from './dashboardPage.js';

export function attachDashboardEvents() {

  /* =========================
     DATE FILTER
  ========================= */

  document
    .getElementById(
      'dateFilter'
    )
    .addEventListener(
      'change',
      e => {

        state.filters.dateRange =
          e.target.value;

        renderDashboardPage();
      }
    );

  /* =========================
     BRAND
  ========================= */

  document
    .getElementById(
      'brandFilter'
    )
    .addEventListener(
      'change',
      e => {

        state.filters.brand =
          e.target.value;

        renderDashboardPage();
      }
    );

  /* =========================
     ERP STATUS
  ========================= */

  document
    .getElementById(
      'erpStatusFilter'
    )
    .addEventListener(
      'change',
      e => {

        state.filters.erpStatus =
          e.target.value;

        renderDashboardPage();
      }
    );

  /* =========================
     ARTICLE TYPE
  ========================= */

  document
    .getElementById(
      'articleTypeFilter'
    )
    .addEventListener(
      'change',
      e => {

        state.filters.articleType =
          e.target.value;

        renderDashboardPage();
      }
    );

  /* =========================
     SEARCH
  ========================= */

  document
    .getElementById(
      'searchFilter'
    )
    .addEventListener(
      'input',

      debounce(e => {

        state.filters.search =
          e.target.value;

        renderDashboardPage();

      }, 300)
    );
}