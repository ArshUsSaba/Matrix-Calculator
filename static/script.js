document.addEventListener('DOMContentLoaded', () => {
    const operationSelect = document.getElementById('operation');
    const matrixBContainer = document.getElementById('matrix-b-container');
    const calculateBtn = document.getElementById('calculate-btn');
    const clearBtn = document.getElementById('clear-btn');
    const resultContainer = document.getElementById('result-container');
    const errorMessage = document.getElementById('error-message');
    const resultOutput = document.getElementById('result-output');

    // Initialize default matrices
    generateMatrixHTML('a', 2, 2);
    generateMatrixHTML('b', 2, 2);

    // Single matrix operations hide Matrix B
    operationSelect.addEventListener('change', (e) => {
        const op = e.target.value;
        const singleOps = ['transpose', 'determinant', 'inverse', 'trace'];
        if (singleOps.includes(op)) {
            matrixBContainer.style.display = 'none';
        } else {
            matrixBContainer.style.display = 'block';
        }
    });

    // Make global for inline onclick handlers
    window.generateMatrix = function(type) {
        const rows = parseInt(document.getElementById(`rows-${type}`).value);
        const cols = parseInt(document.getElementById(`cols-${type}`).value);
        
        if (rows < 1 || cols < 1 || rows > 10 || cols > 10) {
            alert("Dimensions must be between 1 and 10.");
            return;
        }
        
        generateMatrixHTML(type, rows, cols);
    };

    function generateMatrixHTML(type, rows, cols) {
        const container = document.getElementById(`matrix-${type}-inputs`);
        container.innerHTML = '';
        
        for (let i = 0; i < rows; i++) {
            const rowDiv = document.createElement('div');
            rowDiv.className = 'matrix-row';
            for (let j = 0; j < cols; j++) {
                const input = document.createElement('input');
                input.type = 'number';
                input.className = 'matrix-input';
                input.dataset.row = i;
                input.dataset.col = j;
                input.value = '0';
                rowDiv.appendChild(input);
            }
            container.appendChild(rowDiv);
        }
    }

    function getMatrixData(type) {
        const container = document.getElementById(`matrix-${type}-inputs`);
        const rowsDivs = container.getElementsByClassName('matrix-row');
        const matrix = [];
        
        for (let i = 0; i < rowsDivs.length; i++) {
            const row = [];
            const inputs = rowsDivs[i].getElementsByClassName('matrix-input');
            for (let j = 0; j < inputs.length; j++) {
                const val = parseFloat(inputs[j].value);
                if (isNaN(val)) {
                    throw new Error(`Invalid number in Matrix ${type.toUpperCase()}`);
                }
                row.push(val);
            }
            matrix.push(row);
        }
        return matrix;
    }

    clearBtn.addEventListener('click', () => {
        const inputs = document.querySelectorAll('.matrix-input');
        inputs.forEach(input => input.value = '0');
        resultContainer.classList.add('hidden');
    });

    calculateBtn.addEventListener('click', () => {
        const operation = operationSelect.value;
        const singleOps = ['transpose', 'determinant', 'inverse', 'trace'];
        
        resultContainer.classList.remove('hidden');
        errorMessage.textContent = '';
        resultOutput.innerHTML = 'Calculating...';

        try {
            const matrixA = getMatrixData('a');
            let matrixB = null;
            
            if (!singleOps.includes(operation)) {
                matrixB = getMatrixData('b');
            }

            const payload = {
                operation: operation,
                matrixA: matrixA,
                matrixB: matrixB
            };

            fetch('/calculate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    errorMessage.textContent = data.error;
                    resultOutput.innerHTML = '';
                } else {
                    displayResult(data.result, data.type);
                }
            })
            .catch(error => {
                errorMessage.textContent = "An error occurred while communicating with the server.";
                resultOutput.innerHTML = '';
                console.error('Error:', error);
            });

        } catch (error) {
            errorMessage.textContent = error.message;
            resultOutput.innerHTML = '';
        }
    });

    function displayResult(result, type) {
        resultOutput.innerHTML = '';
        errorMessage.textContent = '';

        if (type === 'scalar') {
            const div = document.createElement('div');
            div.className = 'result-scalar';
            div.textContent = Number.isInteger(result) ? result : result.toFixed(4);
            resultOutput.appendChild(div);
        } else if (type === 'matrix') {
            result.forEach(rowData => {
                const rowDiv = document.createElement('div');
                rowDiv.className = 'result-matrix-row';
                rowData.forEach(cellData => {
                    const cellDiv = document.createElement('div');
                    cellDiv.className = 'result-cell';
                    cellDiv.textContent = Number.isInteger(cellData) ? cellData : cellData.toFixed(4);
                    rowDiv.appendChild(cellDiv);
                });
                resultOutput.appendChild(rowDiv);
            });
        }
    }
});
