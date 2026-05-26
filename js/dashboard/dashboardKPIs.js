export function renderDashboardKPIs(
  kpis
) {

  return `

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
  `;
}