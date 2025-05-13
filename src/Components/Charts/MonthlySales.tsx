import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import './MonthlySales.css';


interface SalesData {
  month: string;
  sales: number;
}


const mockSalesData: SalesData[] = [
  { month: 'Jan', sales: 4000 },
  { month: 'Feb', sales: 3000 },
  // ...
];

export default function MonthlySales() {
 
  const isLoading = false;
  const error = null;

  if (isLoading) return <div className="skeleton-loader">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="monthly-sales-container">
      <h3>Monthly Sales</h3>
     
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={mockSalesData}>
          <Line type="monotone" dataKey="sales" stroke="#8884d8" strokeWidth={2} />
          <XAxis dataKey="month" />
          <YAxis />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}