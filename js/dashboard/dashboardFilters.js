import { state }
from '../core/state.js';

function getUniqueValues(data, key) {

  return [

    ...new Set(

      data
        .map(row => row[key])
        .filter(Boolean)

    )

  ].sort();
}

export function renderDashboardFilters(
  rawData
) {

  const brands =
    getUniqueValues(
      rawData,
      'brand'
    );

  const articleTypes =
    getUniqueValues(
      rawData,
      'article_type'
    );

  const erpStatuses =
    getUniqueValues(
      rawData,
      'erp_status'
    );

  return `

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
  `;
}