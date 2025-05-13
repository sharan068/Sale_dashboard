import { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { FixedSizeList as List } from 'react-window';
import './TopProduct.css';

// 1. TypeScript interfaces
interface Product {
  id: number;
  name: string;
  sales: number;
}

interface SortConfig {
  key: keyof Product;
  direction: 'asc' | 'desc';
}

export default function TopProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: 'sales',
    direction: 'desc',
  });

  useEffect(() => {
  const fetchProducts = async () => {
  try {
    const response = await axios.get('https://api.npoint.io/b0b6bb5c47846cf804bb');
    console.log('Full API Response:', response.data);  // Log the entire response

    // Adjust based on the actual API response structure
    if (Array.isArray(response.data)) {
      setProducts(response.data);  // If the root response is an array
    } else if (Array.isArray(response.data.products)) {
      setProducts(response.data.products);  // If the products array is inside a 'products' property
    } else {
      console.error('API data is not in the expected format');
    }
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};



    fetchProducts();
  }, []);

  // Memoize sorted products
  const sortedProducts = useMemo(() => {
    return [...products].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [products, sortConfig]);

  // Virtualized row renderer
  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => (
    <div style={style} className={`product-row ${index % 2 ? 'odd' : 'even'}`}>
      <div className="product-cell">{sortedProducts[index].name}</div>
      <div className="product-cell">${sortedProducts[index].sales.toLocaleString()}</div>
    </div>
  );

  const requestSort = (key: keyof Product) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const SortIndicator = ({ columnKey }: { columnKey: keyof Product }) => (
    <span className="sort-indicator">
      {sortConfig.key === columnKey
        ? sortConfig.direction === 'asc'
          ? '↑'
          : '↓'
        : ''}
    </span>
  );

  return (
    <div className="products-container">
      <h3 className="products-title">Top Products</h3>
      <div className="table-header">
        <div className="header-cell" onClick={() => requestSort('name')}>
          Product <SortIndicator columnKey="name" />
        </div>
        <div className="header-cell" onClick={() => requestSort('sales')}>
          Sales <SortIndicator columnKey="sales" />
        </div>
      </div>

      {/* Conditional rendering until data is fetched */}
      {products.length > 0 ? (
        <List height={400} itemCount={sortedProducts.length} itemSize={50} width="100%">
          {Row}
        </List>
      ) : (
        <div>Loading...</div> // Or a fallback message if data is not available
      )}
    </div>
  );
}

