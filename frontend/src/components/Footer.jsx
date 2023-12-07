import { useGetCategoryQuery } from '../slices/productsApiSlice';
import { FaCcAmex, FaCreditCard, FaPaypal, FaCcVisa } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { Link } from 'react-router-dom';

const Footer = () => {
  const { userInfo } = useSelector(state => state.auth);

  const { data: categories, isLoading } = useGetCategoryQuery();

  return (
    <footer className="bg-gray-800 text-white py-8" style={{ marginBottom: "-15px" }}>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="mb-8 md:mb-0">
            <h4 className="text-xl font-semibold mb-4">About us</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, ullam?
            </p>
          </div>
          <div className="mb-8 md:mb-0">
            <h4 className="text-xl font-semibold mb-4">Category</h4>
            <div className="category flex flex-wrap">
              {Array.isArray(categories) &&
                categories.map((category) => (
                  <Link key={category} to={`/${category}`}>
                    <button className="text-white my-2 mr-2 md:mr-4 hover:text-gray-400 focus:outline-none">
                      {category.toUpperCase()}
                    </button>
                  </Link>
                ))}
            </div>

          </div>
          <div className="mb-8 md:mb-0">
            <h4 className="text-xl font-semibold mb-4">Payment</h4>
            <ul className="payment list-none p-0">
              <li className="inline-block mr-2"><FaPaypal /></li>
              <li className="inline-block mr-2"><FaCcAmex /></li>
              <li className="inline-block mr-2"><FaCreditCard /></li>
              <li className="inline-block"><FaCcVisa /></li>
            </ul>
          </div>
          <div>
            {userInfo && userInfo.admin && (
              <Link to="/admin/userslist">
                <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                  <AdminPanelSettingsIcon /> Admin Panel
                </button>
              </Link>
            )}
          </div>
        </div>
        <hr className="my-8 border-t border-gray-600" />
        <div className="text-center">
          <p className="text-gray-400">
            Copyright © BASHPO {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
