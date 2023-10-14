import Breadcrumbs from "./Breadcrumbs";
import TopNav from "./Topnav";
const Books = ({setlinkClicked}) => {
  return (
    <main className="books">
      <TopNav setlinkClicked={setlinkClicked}/>
      <Breadcrumbs />
      <h1>books</h1>
    </main>
  );
};

export default Books;
