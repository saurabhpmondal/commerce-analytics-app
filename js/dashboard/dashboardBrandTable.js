export function renderBrandTable(
  data
) {

  return `

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

            ${data.map(row => `

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
  `;
}