import Breadcrumbs from "./Breadcrumbs";
import TopNav from "./Topnav";
const Employees = ({setlinkClicked}) => {
  return (
    <main className="employees">
      <TopNav setlinkClicked={setlinkClicked} />
      <Breadcrumbs />
          </main>
  );
};

export default Employees;
