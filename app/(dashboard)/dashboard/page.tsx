import React from 'react';

interface DashboardPropsI {
    className?: string;
}

const Dashboard: React.FC<DashboardPropsI> = ({ className }) => {
    return <div className={className}>Dashboard</div>;
};

export default Dashboard;
