function parseFraction(str) {
  // Handle whole numbers
  if (!str.includes('/')) {
    return { numerator: parseInt(str), denominator: 1 };
  }
  
  const parts = str.trim().split('/');
  return {
    numerator: parseInt(parts[0]),
    denominator: parseInt(parts[1])
  };
}

function formatFraction(numerator, denominator) {
  // If it's a whole number
  if (numerator % denominator === 0) {
    return (numerator / denominator).toString();
  }
  return `${numerator}/${denominator}`;
}

function updateIngredients(multiplier) {
  const ingredientElems = document.querySelectorAll('.q');
  ingredientElems.forEach((elem) => {
    const originalFraction = parseFraction(elem.getAttribute('def'));
    if (!isNaN(originalFraction.numerator) && !isNaN(originalFraction.denominator)) {
      // Calculate new numerator while keeping the same denominator
      const newNumerator = originalFraction.numerator * multiplier;
      const newFraction = formatFraction(newNumerator, originalFraction.denominator);
      elem.textContent = `${newFraction} ${elem.textContent.split(' ').slice(1).join(' ')}`;
    }
  });
}

function renderInitialQuantities() {
  const ingredientElems = document.querySelectorAll('.q');
  ingredientElems.forEach((elem) => {
    const originalFraction = parseFraction(elem.getAttribute('def'));
    if (!isNaN(originalFraction.numerator) && !isNaN(originalFraction.denominator)) {
      const fraction = formatFraction(originalFraction.numerator, originalFraction.denominator);
      elem.textContent = `${fraction} ${elem.textContent.trim()}`;
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderInitialQuantities();
});

document.getElementById('increase').addEventListener('click', () => {
  const multiEl = document.getElementById('multiplier');
  const current = parseInt(multiEl.textContent);
  const updated = current + 1;
  multiEl.textContent = updated;
  updateIngredients(updated);
});

document.getElementById('decrease').addEventListener('click', () => {
  const multiEl = document.getElementById('multiplier');
  const current = parseInt(multiEl.textContent);
  const updated = (current > 1) ? current - 1 : 1;
  multiEl.textContent = updated;
  updateIngredients(updated);
});