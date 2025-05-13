import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend,
} from 'recharts';
import './SalesByRegion.css';

interface RegionalSale {
  region: string;
  sales: number;
}

export default function SalesByRegion() {
  const [data, setData] = useState<RegionalSale[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      console.log('Fetching regional sales...');
      setLoading(true);

      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        const response = await axios.get('https://api.npoint.io/ecc9d70d922da75016a9');

        const formatted = response.data.regions.map((r: any) => ({
          region: r.name,
          sales: r.total,
        }));

        console.log('Formatted data:', formatted);
        setData(formatted);
        setError(null);
      } catch (err: any) {
        console.error('Error fetching data:', err);
        setError(err.message || 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="region-skeleton">Loading regional data...</div>;
  if (error) return <div className="region-error">Failed to load data: {error}</div>;
  if (data.length === 0) return <div className="region-error">No data available</div>;

  return (
    <div className="region-container">
      <h3 className="region-title">Sales by Region</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="region" tick={{ fontSize: 12 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="sales"
            fill="#82ca9d"
            radius={[4, 4, 0, 0]}
            name="Total Sales"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
