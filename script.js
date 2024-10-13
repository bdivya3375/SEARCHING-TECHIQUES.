let searchType = '';

function setSearchType() {
  searchType = document.getElementById('searchMethod').value;
  
  // Hide the introduction after selecting a search method
  document.getElementById('introSection').style.display = 'none';
  
  // Show the search section
  document.getElementById('searchSection').style.display = 'block';
  
  // Update the heading based on the selected search type
  const searchTitle = document.getElementById('searchTitle');
  if (searchType === 'linear') {
    searchTitle.textContent = 'Linear Search';
  } else if (searchType === 'binary') {
    searchTitle.textContent = 'Binary Search';
  }
}

function createInputFields() {
  const numElements = document.getElementById('numElements').value;
  const arrayInputsDiv = document.getElementById('arrayInputs');
  arrayInputsDiv.innerHTML = '';
  document.getElementById('result').textContent = '';
  document.getElementById('result').classList.remove('error');

  if (numElements > 0) {
    for (let i = 0; i < numElements; i++) {
      arrayInputsDiv.innerHTML += `
        <div class="input-container">
          <label for="element${i}">Element ${i + 1}:</label>
          <input type="number" id="element${i}" class="arrayElement">
        </div>`;
    }
  }
}

function performSearch() {
  const elements = document.getElementsByClassName('arrayElement');
  const searchElement = parseInt(document.getElementById('searchElement').value);
  const array = [];

  for (let i = 0; i < elements.length; i++) {
    elements[i].classList.remove('highlight');
    array.push({ value: parseInt(elements[i].value), index: i });
  }

  let result;

  if (searchType === 'binary') {
    // Check if the array is sorted
    const isSorted = array.every((item, index) => index === 0 || item.value >= array[index - 1].value);
    
    if (!isSorted) {
      alert('Caution: The elements should be in sorted order for binary search.');
      return; // Stop the search if the array is not sorted
    }

    result = binarySearch(array, searchElement);
  } else {
    result = linearSearch(array, searchElement);
  }

  const resultDiv = document.getElementById('result');

  if (result !== -1) {
    const originalIndex = array[result].index; // Get original index before sorting for binary search
    resultDiv.textContent = `Element found at index: ${originalIndex}`;
    resultDiv.classList.remove('error');
    elements[originalIndex].classList.add('highlight');
  } else {
    resultDiv.textContent = 'Element not found in the array.';
    resultDiv.classList.add('error');
  }
}

function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].value === target) {
      return i;
    }
  }
  return -1;
}

function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid].value === target) {
      return mid;
    } else if (arr[mid].value < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -1;
}
