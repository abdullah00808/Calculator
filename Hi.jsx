import React, { useState, useEffect } from 'react';

const App = () => {
  const [displayValue, setDisplayValue] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [memory, setMemory] = useState(0);
  const [history, setHistory] = useState([]);

  const clearAll = () => {
    setDisplayValue('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const clearEntry = () => {
    setDisplayValue('0');
  };

  const toggleSign = () => {
    setDisplayValue(prev => (parseFloat(prev) * -1).toString());
  };

  const addDecimal = () => {
    if (waitingForOperand) {
      setDisplayValue('0.');
      setWaitingForOperand(false);
    } else {
      if (!displayValue.includes('.')) {
        setDisplayValue(prev => prev + '.');
      }
    }
  };

  const inputDigit = (digit) => {
    if (waitingForOperand) {
      setDisplayValue(digit);
      setWaitingForOperand(false);
    } else {
      setDisplayValue(prev => prev === '0' ? digit : prev + digit);
    }
  };

  const performOperation = (nextOperation) => {
    const inputValue = parseFloat(displayValue);

    if (previousValue === null) {
      setPreviousValue(inputValue);
      setDisplayValue('0');
    } else if (operation) {
      const result = calculateResult(previousValue, inputValue, operation);
      setHistory([...history, `${previousValue} ${operation} ${inputValue} = ${result}`]);
      setDisplayValue(String(result));
      setPreviousValue(result);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculateResult = (prev, next, operation) => {
    switch (operation) {
      case '+': return prev + next;
      case '-': return prev - next;
      case '×': return prev * next;
      case '÷': return prev / next;
      case '^': return Math.pow(prev, next);
      default: return next;
    }
  };

  const calculatePercentage = () => {
    const currentValue = parseFloat(displayValue);
    setDisplayValue((currentValue / 100).toString());
  };

  const calculateSquareRoot = () => {
    const currentValue = parseFloat(displayValue);
    setDisplayValue(Math.sqrt(currentValue).toString());
  };

  const calculateFactorial = () => {
    const currentValue = parseInt(displayValue);
    if (currentValue < 0) return 'Error';
    let result = 1;
    for (let i = 2; i <= currentValue; i++) result *= i;
    setDisplayValue(result.toString());
  };

  const calculateTrig = (func) => {
    const currentValue = parseFloat(displayValue);
    let result;
    switch(func) {
      case 'sin': result = Math.sin(currentValue); break;
      case 'cos': result = Math.cos(currentValue); break;
      case 'tan': result = Math.tan(currentValue); break;
    }
    setDisplayValue(result.toString());
  };

  const addToMemory = () => {
    setMemory(prev => prev + parseFloat(displayValue));
  };

  const subtractFromMemory = () => {
    setMemory(prev => prev - parseFloat(displayValue));
  };

  const recallMemory = () => {
    setDisplayValue(memory.toString());
    setWaitingForOperand(true);
  };

  const clearMemory = () => {
    setMemory(0);
  };

  const formatDisplay = (value) => {
    if (value.length > 12) {
      return parseFloat(value).toExponential(6);
    }
    return value;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Calculator Header */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex justify-between items-center">
            <h1 className="text-white text-xl font-bold">Advanced Calculator</h1>
            <div className="flex space-x-2">
              <button 
                onClick={clearMemory}
                className="text-xs px-2 py-1 bg-gray-700 text-gray-300 rounded hover:bg-gray-600 transition"
              >
                MC
              </button>
              <button 
                onClick={recallMemory}
                className="text-xs px-2 py-1 bg-gray-700 text-gray-300 rounded hover:bg-gray-600 transition"
              >
                MR
              </button>
            </div>
          </div>
        </div>

        {/* Display */}
        <div className="p-4 bg-gray-900 rounded-t-2xl">
          <div className="space-y-2">
            <div className="text-right text-gray-400 text-sm h-6 overflow-hidden">
              {history.length > 0 && history[history.length - 1]}
            </div>
            <div className="text-right text-white text-4xl font-light overflow-x-auto scrollbar-hide">
              {formatDisplay(displayValue)}
            </div>
          </div>
        </div>

        {/* Keypad */}
        <div className="grid grid-cols-5 gap-1 p-2 bg-gray-800">
          {/* Row 1 */}
          <button onClick={clearAll} className="col-span-2 bg-red-600 hover:bg-red-700 text-white text-xl rounded-lg p-4 transition-all transform hover:scale-105 active:scale-95">
            AC
          </button>
          <button onClick={clearEntry} className="bg-gray-700 hover:bg-gray-600 text-white text-xl rounded-lg p-4 transition-all transform hover:scale-105 active:scale-95">
            C
          </button>
          <button onClick={calculatePercentage} className="bg-gray-700 hover:bg-gray-600 text-white text-xl rounded-lg p-4 transition-all transform hover:scale-105 active:scale-95">
            %
          </button>
          <button onClick={() => performOperation('÷')} className="bg-gray-700 hover:bg-gray-600 text-white text-xl rounded-lg p-4 transition-all transform hover:scale-105 active:scale-95">
            ÷
          </button>

          {/* Row 2 */}
          <button onClick={addToMemory} className="bg-gray-700 hover:bg-gray-600 text-white text-xl rounded-lg p-4 transition-all transform hover:scale-105 active:scale-95">
            M+
          </button>
          <button onClick={subtractFromMemory} className="bg-gray-700 hover:bg-gray-600 text-white text-xl rounded-lg p-4 transition-all transform hover:scale-105 active:scale-95">
            M-
          </button>
          <button onClick={calculateSquareRoot} className="bg-gray-700 hover:bg-gray-600 text-white text-xl rounded-lg p-4 transition-all transform hover:scale-105 active:scale-95">
            √
          </button>
          <button onClick={calculateFactorial} className="bg-gray-700 hover:bg-gray-600 text-white text-xl rounded-lg p-4 transition-all transform hover:scale-105 active:scale-95">
            x!
          </button>
          <button onClick={() => performOperation('^')} className="bg-gray-700 hover:bg-gray-600 text-white text-xl rounded-lg p-4 transition-all transform hover:scale-105 active:scale-95">
            x<sup>y</sup>
          </button>

          {/* Row 3 */}
          <button onClick={() => calculateTrig('sin')} className="bg-gray-700 hover:bg-gray-600 text-white text-xl rounded-lg p-4 transition-all transform hover:scale-105 active:scale-95">
            sin
          </button>
          <button onClick={() => calculateTrig('cos')} className="bg-gray-700 hover:bg-gray-600 text-white text-xl rounded-lg p-4 transition-all transform hover:scale-105 active:scale-95">
            cos
          </button>
          <button onClick={() => calculateTrig('tan')} className="bg-gray-700 hover:bg-gray-600 text-white text-xl rounded-lg p-4 transition-all transform hover:scale-105 active:scale-95">
            tan
          </button>
          <button onClick={() => inputDigit('(')} className="bg-gray-700 hover:bg-gray-600 text-white text-xl rounded-lg p-4 transition-all transform hover:scale-105 active:scale-95">
            (
          </button>
          <button onClick={() => inputDigit(')')} className="bg-gray-700 hover:bg-gray-600 text-white text-xl rounded-lg p-4 transition-all transform hover:scale-105 active:scale-95">
            )
          </button>

          {/* Row 4 */}
          <button onClick={() => inputDigit('7')} className="bg-gray-700 hover:bg-gray-600 text-white text-xl rounded-lg p-4 transition-all transform hover:scale-105 active:scale-95">
            7
          </button>
          <button onClick={() => inputDigit('8')} className="bg-gray-700 hover:bg-gray-600 text-white text-xl rounded-lg p-4 transition-all transform hover:scale-105 active:scale-95">
            8
          </button>
          <button onClick={() => inputDigit('9')} className="bg-gray-700 hover:bg-gray-600 text-white text-xl rounded-lg p-4 transition-all transform hover:scale-105 active:scale-95">
            9
          </button>
          <button onClick={() => performOperation('×')} className="bg-gray-700 hover:bg-gray-600 text-white text-xl rounded-lg p-4 transition-all transform hover:scale-105 active:scale-95">
            ×
          </button>
          <button onClick={toggleSign} className="bg-gray-700 hover:bg-gray-600 text-white text-xl rounded-lg p-4 transition-all transform hover:scale-105 active:scale-95">
            ±
          </button>

          {/* Row 5 */}
          <button onClick={() => inputDigit('4')} className="bg-gray-700 hover:bg-gray-600 text-white text-xl rounded-lg p-4 transition-all transform hover:scale-105 active:scale-95">
            4
          </button>
          <button onClick={() => inputDigit('5')} className="bg-gray-700 hover:bg-gray-600 text-white text-xl rounded-lg p-4 transition-all transform hover:scale-105 active:scale-95">
            5
          </button>
          <button onClick={() => inputDigit('6')} className="bg-gray-700 hover:bg-gray-600 text-white text-xl rounded-lg p-4 transition-all transform hover:scale-105 active:scale-95">
            6
          </button>
          <button onClick={() => performOperation('-')} className="bg-gray-700 hover:bg-gray-600 text-white text-xl rounded-lg p-4 transition-all transform hover:scale-105 active:scale-95">
            -
          </button>
          <button onClick={() => inputDigit('π')} className="bg-gray-700 hover:bg-gray-600 text-white text-xl rounded-lg p-4 transition-all transform hover:scale-105 active:scale-95">
            π
          </button>

          {/* Row 6 */}
          <button onClick={() => inputDigit('1')} className="bg-gray-700 hover:bg-gray-600 text-white text-xl rounded-lg p-4 transition-all transform hover:scale-105 active:scale-95">
            1
          </button>
          <button onClick={() => inputDigit('2')} className="bg-gray-700 hover:bg-gray-600 text-white text-xl rounded-lg p-4 transition-all transform hover:scale-105 active:scale-95">
            2
          </button>
          <button onClick={() => inputDigit('3')} className="bg-gray-700 hover:bg-gray-600 text-white text-xl rounded-lg p-4 transition-all transform hover:scale-105 active:scale-95">
            3
          </button>
          <button onClick={() => performOperation('+')} className="bg-gray-700 hover:bg-gray-600 text-white text-xl rounded-lg p-4 transition-all transform hover:scale-105 active:scale-95">
            +
          </button>
          <button onClick={() => inputDigit('e')} className="bg-gray-700 hover:bg-gray-600 text-white text-xl rounded-lg p-4 transition-all transform hover:scale-105 active:scale-95">
            e
          </button>

          {/* Row 7 */}
          <button onClick={() => inputDigit('0')} className="col-span-2 bg-gray-700 hover:bg-gray-600 text-white text-xl rounded-lg p-4 transition-all transform hover:scale-105 active:scale-95">
            0
          </button>
          <button onClick={addDecimal} className="bg-gray-700 hover:bg-gray-600 text-white text-xl rounded-lg p-4 transition-all transform hover:scale-105 active:scale-95">
            .
          </button>
          <button onClick={() => {}} className="bg-gray-700 hover:bg-gray-600 text-white text-xl rounded-lg p-4 transition-all transform hover:scale-105 active:scale-95">
            ,
          </button>
          <button 
            onClick={() => {
              if (previousValue !== null && operation !== null) {
                const result = calculateResult(previousValue, parseFloat(displayValue), operation);
                setDisplayValue(String(result));
                setPreviousValue(null);
                setOperation(null);
              }
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xl rounded-lg p-4 transition-all transform hover:scale-105 active:scale-95"
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
