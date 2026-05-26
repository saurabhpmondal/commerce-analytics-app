export function renderArticleTable(
  data
) {

  return `

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

            ${data.map(row => `

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
  `;
}