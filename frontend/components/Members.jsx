import Breadcrumbs from "./Breadcrumbs";
import TopNav from "./Topnav";

const Members = ({setlinkClicked}) => {
  return (
    <main className="members">
      <TopNav setlinkClicked={setlinkClicked} />
      <Breadcrumbs />
      Members
    </main>
  );
};

export default Members;
