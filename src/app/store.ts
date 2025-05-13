

// Simulate 2-second delay (as per assignment)
const simulateDelay = () => new Promise(resolve => setTimeout(resolve, 2000));

// Fetch functions
export const fetchSalesData = async () => {
  await simulateDelay();
  const response = await fetch('https://api.npoint.io/ecc9d70d922da75016a9');
  return response.json();
};

export const fetchRepPerformance = async () => {
  await simulateDelay();
  const response = await fetch('https://api.npoint.io/1d89cf12b4ed0996c1db');
  return response.json();
};

export const fetchProducts = async () => {
  await simulateDelay();
  const response = await fetch('https://api.npoint.io/b0b6bb5c47846cf804bb');
  return response.json();
};