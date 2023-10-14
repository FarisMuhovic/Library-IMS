import Breadcrumbs from "./Breadcrumbs";
import TopNav from "./Topnav";

const Dashboard = () => {
  return (
    <main className="dashboard">
      <TopNav />
      <Breadcrumbs />
      <div className="dashboard-grid">
        <section className="members-overview">
          <h2>
            Total members <br />
            <span>40</span>
          </h2>
          <h2>
            New members <br />
            <span>6</span>
          </h2>
          <table className="new-members-info">
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Genre</th>
              <th>Publish Date</th>
              <th>Shelf Location</th>
            </tr>
            <tr>
              <td>12345</td>
              <td>John</td>
              <td>Doe</td>
              <td>30</td>
              <td>2023-10-01</td>
            </tr>
            <tr>
              <td>1001</td>
              <td>Alice</td>
              <td>Johnson</td>
              <td>28</td>
              <td>2023-09-15</td>
            </tr>
            <tr>
              <td>1002</td>
              <td>Bob</td>
              <td>Smith</td>
              <td>35</td>
              <td>2023-08-20</td>
            </tr>
            <tr>
              <td>1003</td>
              <td>Emily</td>
              <td>Davis</td>
              <td>24</td>
              <td>2023-09-30</td>
            </tr>
            <tr>
              <td>1005</td>
              <td>Mary</td>
              <td>Smith</td>
              <td>32</td>
              <td>2023-09-25</td>
            </tr>
          </table>
        </section>
        <section className="books-overview">
          <h2>
            Total books <br />
            <span>247</span>
          </h2>
          <h2>
            Books out of stock
            <br />
            <span>0</span>
          </h2>
          <table className="low-quantity-info">
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Genre</th>
              <th>Publish Date</th>
              <th>Shelf Location</th>
            </tr>
            <tr>
              <td>12345</td>
              <td>John</td>
              <td>Doe</td>
              <td>30</td>
              <td>2023-10-01</td>
            </tr>
            <tr>
              <td>1001</td>
              <td>Alice</td>
              <td>Johnson</td>
              <td>28</td>
              <td>2023-09-15</td>
            </tr>
            <tr>
              <td>1002</td>
              <td>Bob</td>
              <td>Smith</td>
              <td>35</td>
              <td>2023-08-20</td>
            </tr>
            <tr>
              <td>1003</td>
              <td>Emily</td>
              <td>Davis</td>
              <td>24</td>
              <td>2023-09-30</td>
            </tr>
            <tr>
              <td>1005</td>
              <td>Mary</td>
              <td>Smith</td>
              <td>32</td>
              <td>2023-09-25</td>
            </tr>
          </table>
        </section>
        <section className="transactions-overview">
          {" "}
          <h2>
            Transactions <br />
            <span>13</span>
          </h2>
          <h2>
            Active
            <br />
            <span>4</span>
          </h2>
          <table className="latest-transactions-info">
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Genre</th>
              <th>Publish Date</th>
              <th>Shelf Location</th>
            </tr>
            <tr>
              <td>12345</td>
              <td>John</td>
              <td>Doe</td>
              <td>30</td>
              <td>2023-10-01</td>
            </tr>
            <tr>
              <td>1001</td>
              <td>Alice</td>
              <td>Johnson</td>
              <td>28</td>
              <td>2023-09-15</td>
            </tr>
            <tr>
              <td>1002</td>
              <td>Bob</td>
              <td>Smith</td>
              <td>35</td>
              <td>2023-08-20</td>
            </tr>
            <tr>
              <td>1003</td>
              <td>Emily</td>
              <td>Davis</td>
              <td>24</td>
              <td>2023-09-30</td>
            </tr>
            <tr>
              <td>1005</td>
              <td>Mary</td>
              <td>Smith</td>
              <td>32</td>
              <td>2023-09-25</td>
            </tr>
          </table>
        </section>
      </div>
    </main>
  );
};

export default Dashboard;
