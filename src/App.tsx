import React, { Suspense } from 'react';
import './App.css';


const DashboardLayout = React.lazy(() => import('./Components/DasboardLyt/Dashboardlayt'));

function App() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <DashboardLayout />
      </Suspense>
    </div>
  );
}

export default App;
