import { useState, useMemo } from 'react';
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

// 2. Mock data with type safety
const mockProducts: Product[] = Array.from({ length: 1000 }, (_, i) => ({
  id: i + 1,
  name: `Product ${String.fromCharCode(65 + (i % 26))}${i > 25 ? Math.floor(i / 26) : ''}`,
  sales: Math.floor(Math.random() * 10000) + 1000,
}));

export default function TopProducts() {
  // 3. State with TypeScript
  const [sortConfig, setSortConfig] = useState<SortConfig>({ 
    key: 'sales', 
    direction: 'desc' 
  });

  // 4. Memoized sorting
  const sortedProducts = useMemo(() => {
    return [...mockProducts].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [sortConfig]);

  // 5. Virtualized row renderer
  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => (
    <div 
      style={style} 
      className={`product-row ${index % 2 ? 'odd' : 'even'}`}
    >
      <div className="product-cell">{sortedProducts[index].name}</div>
      <div className="product-cell">
        ${sortedProducts[index].sales.toLocaleString()}
      </div>
    </div>
  );

  const requestSort = (key: keyof Product) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  // 6. Sort indicator component
  const SortIndicator = ({ columnKey }: { columnKey: keyof Product }) => (
    <span className="sort-indicator">
      {sortConfig.key === columnKey ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
    </span>
  );

  return (
    <div className="products-container">
      <h3 className="products-title">Top Products</h3>
      <div className="table-header">
        <div 
          className="header-cell" 
          onClick={() => requestSort('name')}
        >
          Product <SortIndicator columnKey="name" />
        </div>
        <div 
          className="header-cell" 
          onClick={() => requestSort('sales')}
        >
          Sales <SortIndicator columnKey="sales" />
        </div>
      </div>
      
      {/* 7. Virtualized list for performance */}
      <List
        height={400}
        itemCount={Math.min(1000, sortedProducts.length)}
        itemSize={50}
        width="100%"
      >
        {Row}
      </List>
    </div>
  );
}