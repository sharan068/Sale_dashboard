import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import './SalesReps.css';

interface SalesRep {
  id: number;
  name: string;
  sales: number;
  quota: number;
  region?: string;
}

export default function SalesReps() {
  const [reps, setReps] = useState<SalesRep[]>([]);
  const [sortBy, setSortBy] = useState<'name' | 'performance'>('performance');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

 useEffect(() => {
  const fetchReps = async () => {
    try {
      console.log('Fetching reps...');
      const response = await axios.get("https://api.npoint.io/1d89cf12b4ed0996c1db");
      console.log('Reps data: ', response.data);

      const allReps = response.data.teams.flatMap((team: any) =>
        Array.isArray(team.reps) ? team.reps : []
      );

      const validReps = allReps.filter(
        (rep: any) =>
          rep &&
          typeof rep.id === 'number' &&
          typeof rep.name === 'string' &&
          typeof rep.sales === 'number' &&
          typeof rep.quota === 'number'
      );

      setReps(validReps);
    } catch (err) {
      console.error("Failed to load reps", err);
      setError("Failed to load sales reps");
    } finally {
      setLoading(false);  // ✅ THIS MUST BE CALLED
    }
  };

  fetchReps();
}, []);



  const sortedReps = useMemo(() => {
    return [...reps].sort((a, b) => {
      if (sortBy === 'name') {
        console.log('Rendering reps:', reps);
        return a.name.localeCompare(b.name);
      } else {
        return (b.sales / b.quota) - (a.sales / a.quota);
      }
    });
  }, [reps, sortBy]);

  const calculatePerformance = (sales: number, quota: number) => {
    const percentage = Math.round((sales / quota) * 100);
    return {
      percentage,
      status: percentage >= 100 ? 'exceeded' : percentage >= 90 ? 'met' : 'below'
    };
  };

  if (loading) return <div className="reps-skeleton">Loading sales reps...</div>;
  if (error) return <div className="reps-error">Error: {error}</div>;

  return (
    <div className="reps-container">
      <div className="reps-header">
        <h3>Sales Rep Performance</h3>
        <div className="sort-controls">
          <button
            onClick={() => setSortBy('name')}
            className={sortBy === 'name' ? 'active' : ''}
          >
            Sort by Name
          </button>
          <button
            onClick={() => setSortBy('performance')}
            className={sortBy === 'performance' ? 'active' : ''}
          >
            Sort by Performance
          </button>
        </div>
      </div>

      <div className="reps-grid">
        {sortedReps.length === 0 && !loading && (
  <p className="reps-empty">No sales reps found.</p>
)}

        {sortedReps.map((rep) => {
          const perf = calculatePerformance(rep.sales, rep.quota);

          return (
            <div key={rep.id} className={`rep-card ${perf.status}`}>
              <h4>{rep.name}</h4>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${Math.min(perf.percentage, 100)}%` }}
                ></div>
              </div>
              <div className="rep-metrics">
                <p>
                  <span className="label">Sales:</span>
                  <span className="value">${rep.sales.toLocaleString()}</span>
                </p>
                <p>
                  <span className="label">Quota:</span>
                  <span className="value">${rep.quota.toLocaleString()}</span>
                </p>
                <p>
                  <span className="label">Performance:</span>
                  <span className="value">{perf.percentage}%</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
