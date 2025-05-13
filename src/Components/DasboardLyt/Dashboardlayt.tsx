import MonthlySales from '../Charts/MonthlySales';
import TopProducts from '../tables/TopProduct';
import SalesByRegion from '../Charts/SalesByregion';
import SalesReps from '../Widgets/Salesreps';

export default function DashboardLayout() {
  return (
    <div className="dashboard">
      <h1>Sales Dashboard</h1>
      <div className="dashboard-grid">
        <MonthlySales />
        <TopProducts />
        <SalesByRegion />
        <SalesReps />
      </div>
    </div>
  );
}