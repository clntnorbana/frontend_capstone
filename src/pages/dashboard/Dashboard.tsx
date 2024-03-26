import {
  RegisteredResidentCard,
  RequestCertificateCard,
} from "./DashboardCards";

const Dashboard = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-xl mb-5 font-bold text-gray-600">Dashboard</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gridGap: "20px",
        }}
      >
        <RegisteredResidentCard />
        <RequestCertificateCard />
      </div>
    </div>
  );
};
export default Dashboard;
