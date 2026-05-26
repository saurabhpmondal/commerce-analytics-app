import { state }
from '../../core/state.js';

export function getFilteredData(data) {

  let filtered = [...data];

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