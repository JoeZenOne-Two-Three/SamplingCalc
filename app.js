document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");
  app.innerHTML = `
    <div class="max-w-xl mx-auto mt-10 border rounded-lg shadow-lg bg-white p-6">
      <h2 class="text-2xl font-bold mb-4 text-center">Sampling & Defect Rate Calculator</h2>

      <div class="grid gap-6">
        <div class="border-b pb-4">
          <h3 class="text-xl font-semibold mb-2">Defect Rate from Sample</h3>
          <div class="grid gap-4">
            <div>
              <label class="font-semibold">Number of Defects Found</label>
              <input id="defects" type="number" class="mt-1 w-full border p-2 rounded" value="0" />
            </div>
            <div>
              <label class="font-semibold">Sample Size</label>
              <input id="size" type="number" class="mt-1 w-full border p-2 rounded" value="100" />
            </div>
            <button id="calculateRate" class="mt-2 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
              Calculate Failure Rate
            </button>
            <div id="rateResult"></div>
          </div>
        </div>

        <div>
          <h3 class="text-xl font-semibold mb-2">Sample Size for Detection</h3>
          <div class="grid gap-4">
            <div>
              <label class="font-semibold">Defect Rate (%)</label>
              <input id="defectRate" type="number" step="0.01" class="mt-1 w-full border p-2 rounded" value="1" />
            </div>
            <div>
              <label class="font-semibold">Confidence Level (%)</label>
              <input id="confidence" type="number" step="1" class="mt-1 w-full border p-2 rounded" value="95" />
            </div>
            <button id="calculateSample" class="mt-2 w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
              Calculate Sample Size
            </button>
            <div id="sampleResult"></div>
          </div>
        </div>
      </div>
    </div>
  `;

  document.getElementById("calculateRate").onclick = () => {
    const defects = parseInt(document.getElementById("defects").value);
    const size = parseInt(document.getElementById("size").value);
    const rate = ((defects / size) * 100).toFixed(2);
    document.getElementById("defectRate").value = rate;
    document.getElementById("rateResult").innerHTML = `
      <div class="bg-gray-100 rounded-md p-4 text-center mt-2">
        <div class="text-lg font-medium">
          Failure Rate: <span class="font-bold">${rate}%</span>
        </div>
        <div class="text-sm text-gray-600">
          This value has been used to update the defect rate input below.
        </div>
      </div>
    `;
  };

  document.getElementById("calculateSample").onclick = () => {
    const defectRate = parseFloat(document.getElementById("defectRate").value) / 100;
    const confidence = parseFloat(document.getElementById("confidence").value) / 100;
    const n = Math.ceil(Math.log(1 - confidence) / Math.log(1 - defectRate));
    document.getElementById("sampleResult").innerHTML = `
      <div class="bg-gray-100 rounded-md p-4 text-center mt-2">
        <div class="text-lg font-medium">
          Required Sample Size: <span class="font-bold">${n}</span>
        </div>
        <div>
          Ensures at least one defect is detected with ${confidence * 100}% confidence at a ${defectRate * 100}% defect rate.
        </div>
      </div>
    `;
  };
});
