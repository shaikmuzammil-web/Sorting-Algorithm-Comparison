import { useState } from "react";

export default function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);

  const colors = [
    "#ff4d4d",
    "#4d79ff",
    "#33cc33",
    "#ff9900",
    "#cc33ff",
    "#00cccc",
    "#ff66b3",
    "#999900",
    "#0099ff",
    "#ff5050",
  ];

  const bubbleSort = (arr) => {
    let comparisons = 0;
    const temp = [...arr];

    const start = performance.now();

    for (let i = 0; i < temp.length; i++) {
      for (let j = 0; j < temp.length - i - 1; j++) {
        comparisons++;

        if (temp[j].value > temp[j + 1].value) {
          [temp[j], temp[j + 1]] = [temp[j + 1], temp[j]];
        }
      }
    }

    const end = performance.now();

    return {
      sorted: temp,
      comparisons,
      time: (end - start).toFixed(8),
    };
  };

  const mergeSort = (arr) => {
    let comparisons = 0;

    const start = performance.now();

    const merge = (left, right) => {
      const result = [];
      let i = 0;
      let j = 0;

      while (i < left.length && j < right.length) {
        comparisons++;

        if (left[i].value <= right[j].value) {
          result.push(left[i]);
          i++;
        } else {
          result.push(right[j]);
          j++;
        }
      }

      while (i < left.length) {
        result.push(left[i]);
        i++;
      }

      while (j < right.length) {
        result.push(right[j]);
        j++;
      }

      return result;
    };

    const divide = (array) => {
      if (array.length <= 1) return array;

      const mid = Math.floor(array.length / 2);

      const left = divide(array.slice(0, mid));
      const right = divide(array.slice(mid));

      return merge(left, right);
    };

    const sorted = divide([...arr]);

    const end = performance.now();

    return {
      sorted,
      comparisons,
      time: (end - start).toFixed(8),
    };
  };

  const quickSort = (arr) => {
    let comparisons = 0;

    const start = performance.now();

    const sort = (array) => {
      if (array.length <= 1) {
        return array;
      }

      const pivot = array[array.length - 1];
      const left = [];
      const right = [];

      for (let i = 0; i < array.length - 1; i++) {
        comparisons++;

        if (array[i].value < pivot.value) {
          left.push(array[i]);
        } else {
          right.push(array[i]);
        }
      }

      return [...sort(left), pivot, ...sort(right)];
    };

    const sorted = sort([...arr]);

    const end = performance.now();

    return {
      sorted,
      comparisons,
      time: (end - start).toFixed(8),
    };
  };

  const analyze = () => {
    const numbers = input
      .split(",")
      .map((n) => n.trim())
      .filter((n) => n !== "");

    if (numbers.length === 0) {
      alert("Enter numbers separated by commas");
      return;
    }

    const array = numbers.map((num, index) => ({
      value: Number(num),
      id: String.fromCharCode(65 + index),
      color: colors[index % colors.length],
    }));

    const bubble = bubbleSort(array);
    const merge = mergeSort(array);
    const quick = quickSort(array);

    setResult({
      original: array,
      bubble,
      merge,
      quick,
    });
  };

  const renderArray = (arr) => (
    <div
      style={{
        display: "flex",
        gap: "10px",
        flexWrap: "wrap",
        marginTop: "10px",
      }}
    >
      {arr.map((item) => (
        <div
          key={item.id}
          style={{
            background: item.color,
            color: "white",
            padding: "10px 15px",
            borderRadius: "6px",
            fontWeight: "bold",
          }}
        >
          {item.value}
          {item.id}
        </div>
      ))}
    </div>
  );

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial",
        maxWidth: "1200px",
        margin: "auto",
      }}
    >
      <h1>Sorting Algorithm Analyzer</h1>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Example: 5,3,5,2,8,1"
        style={{
          width: "400px",
          padding: "10px",
          marginRight: "10px",
        }}
      />

      <button onClick={analyze}>Analyze</button>

      {result && (
        <>
          <hr />

          <h2>Original Array</h2>
          {renderArray(result.original)}

          <hr />

          <h2>Bubble Sort</h2>
          <p><strong>Stable:</strong> Yes</p>
          <p><strong>In Place:</strong> Yes</p>
          <p><strong>Best Case:</strong> O(n)</p>
          <p><strong>Average Case:</strong> O(n²)</p>
          <p><strong>Worst Case:</strong> O(n²)</p>
          <p><strong>Comparisons:</strong> {result.bubble.comparisons}</p>
          <p><strong>Execution Time:</strong> {result.bubble.time} ms</p>

          <h3>Sorted Array</h3>
          {renderArray(result.bubble.sorted)}

          <hr />

          <h2>Merge Sort</h2>
          <p><strong>Stable:</strong> Yes</p>
          <p><strong>In Place:</strong> No</p>
          <p><strong>Best Case:</strong> O(n log n)</p>
          <p><strong>Average Case:</strong> O(n log n)</p>
          <p><strong>Worst Case:</strong> O(n log n)</p>
          <p><strong>Comparisons:</strong> {result.merge.comparisons}</p>
          <p><strong>Execution Time:</strong> {result.merge.time} ms</p>

          <h3>Sorted Array</h3>
          {renderArray(result.merge.sorted)}

          <hr />

          <h2>Quick Sort</h2>
          <p><strong>Stable:</strong> No</p>
          <p><strong>In Place:</strong> Yes*</p>
          <p><strong>Best Case:</strong> O(n log n)</p>
          <p><strong>Average Case:</strong> O(n log n)</p>
          <p><strong>Worst Case:</strong> O(n²)</p>
          <p><strong>Comparisons:</strong> {result.quick.comparisons}</p>
          <p><strong>Execution Time:</strong> {result.quick.time} ms</p>

          <h3>Sorted Array</h3>
          {renderArray(result.quick.sorted)}

          <hr />

          <h2>Algorithm Comparison</h2>

          <table
            border="1"
            cellPadding="10"
            style={{ borderCollapse: "collapse" }}
          >
            <thead>
              <tr>
                <th>Algorithm</th>
                <th>Stable</th>
                <th>In Place</th>
                <th>Best</th>
                <th>Average</th>
                <th>Worst</th>
                <th>Comparisons</th>
                <th>Time (ms)</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Bubble Sort</td>
                <td>Yes</td>
                <td>Yes</td>
                <td>O(n)</td>
                <td>O(n²)</td>
                <td>O(n²)</td>
                <td>{result.bubble.comparisons}</td>
                <td>{result.bubble.time}</td>
              </tr>

              <tr>
                <td>Merge Sort</td>
                <td>Yes</td>
                <td>No</td>
                <td>O(n log n)</td>
                <td>O(n log n)</td>
                <td>O(n log n)</td>
                <td>{result.merge.comparisons}</td>
                <td>{result.merge.time}</td>
              </tr>

              <tr>
                <td>Quick Sort</td>
                <td>No</td>
                <td>Yes*</td>
                <td>O(n log n)</td>
                <td>O(n log n)</td>
                <td>O(n²)</td>
                <td>{result.quick.comparisons}</td>
                <td>{result.quick.time}</td>
              </tr>
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}