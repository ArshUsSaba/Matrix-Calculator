from flask import Flask, render_template, request, jsonify
import numpy as np

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/calculate', methods=['POST'])
def calculate():
    data = request.get_json()
    op = data.get('operation')
    matrix_a = data.get('matrixA')
    matrix_b = data.get('matrixB')

    try:
        if op in ['add', 'subtract', 'multiply']:
            A = np.array(matrix_a, dtype=float)
            B = np.array(matrix_b, dtype=float)
            
            if op == 'add':
                if A.shape != B.shape:
                    return jsonify({'error': 'Matrices must have the same dimensions for addition.'}), 400
                result = A + B
            elif op == 'subtract':
                if A.shape != B.shape:
                    return jsonify({'error': 'Matrices must have the same dimensions for subtraction.'}), 400
                result = A - B
            elif op == 'multiply':
                if A.shape[1] != B.shape[0]:
                    return jsonify({'error': 'Number of columns in Matrix A must equal number of rows in Matrix B.'}), 400
                result = np.dot(A, B)
                
        elif op in ['transpose', 'determinant', 'inverse', 'trace']:
            A = np.array(matrix_a, dtype=float)
            
            if op == 'transpose':
                result = A.T
            elif op == 'determinant':
                if A.shape[0] != A.shape[1]:
                    return jsonify({'error': 'Matrix must be square to calculate determinant.'}), 400
                result = np.linalg.det(A)
                return jsonify({'result': float(result), 'type': 'scalar'})
            elif op == 'inverse':
                if A.shape[0] != A.shape[1]:
                    return jsonify({'error': 'Matrix must be square to calculate inverse.'}), 400
                det = np.linalg.det(A)
                if det == 0:
                    return jsonify({'error': 'Matrix is singular and cannot be inverted.'}), 400
                result = np.linalg.inv(A)
            elif op == 'trace':
                if A.shape[0] != A.shape[1]:
                    return jsonify({'error': 'Matrix must be square to calculate trace.'}), 400
                result = np.trace(A)
                return jsonify({'result': float(result), 'type': 'scalar'})
                
        else:
            return jsonify({'error': 'Unknown operation.'}), 400

        # Replace NaN and Inf with None (JSON null) if any, though standard operations usually won't produce them unless div by zero
        result = np.nan_to_num(result, nan=0.0, posinf=0.0, neginf=0.0)
        return jsonify({'result': result.tolist(), 'type': 'matrix'})
        
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
