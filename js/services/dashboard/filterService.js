import { state }
from '../../core/state.js';

function getCurrentMonth() {

  const now = new Date();

  return now.getMonth() + 1;
}

function getCurrentYear() {

  const now = new Date();

  return now.getFullYear();
}

function getLastMonth() {

  const now = new Date();

  return now.getMonth();
}

function getLastMonthYear() {

  const now = new Date();

  return now.getMonth() === 0

    ? now.getFullYear() - 1

    : now.getFullYear();
}

export function getFilteredData(data) {

  let filtered = [...data];

  /* =========================
     DATE FILTER
  ========================= */

  if (
    state.filters.dateRange ===
    'This Month'
  ) {

    filtered = filtered.filter(
      row => {

        if (!row.month) return false;

        const date =
          new Date(row.month);

        return (

          date.getMonth() + 1 ===
          getCurrentMonth()

          &&

          date.getFullYear() ===
          getCurrentYear()
        );
      }
    );
  }

  if (
    state.filters.dateRange ===
    'Last Month'
  ) {

    filtered = filtered.filter(
      row => {

        if (!row.month) return false;

        const date =
          new Date(row.month);

        return (

          date.getMonth() + 1 ===
          getLastMonth()

          &&

          date.getFullYear() ===
          getLastMonthYear()
        );
      }
    );
  }

  /* =========================
     BRAND
  ========================= */

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

  /* =========================
     ARTICLE TYPE
  ========================= */

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

  /* =========================
     ERP STATUS
  ========================= */

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

  /* =========================
     SEARCH
  ========================= */

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