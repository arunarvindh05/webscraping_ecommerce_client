import ProductCard from './ProductCard';
import { useState } from 'react';
import axios from 'axios';
import Pagination from './Pagination';

const ProductListPage = () => {
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search === '') {
      return;
    }
    const getData = async () => {
      const res = await axios.get(
        `https://webscraping-node-server.onrender.com/api/products/search?product=${search.toLowerCase()}`
      );
      const allRecords = [
        ...res.data.amazon,
        ...res.data.flipkart,
        ...res.data.snapdeal,
      ];
      setRecords(allRecords);
      setSearch('');
    };
    getData();
  };

  // Get current records
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRecords = records.slice(indexOfFirstItem, indexOfLastItem);
  const productArray = [
    'iphone 14',
    'iphone 13',
    'samsung m13',
    'samsung galaxy tab a8',
    'ipad mini',
    'ipad pro',
    'vivo y21'
  ];
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderProducts = (
    <>
      <div className='result-info'>
        {records.length > 0 ? (
          <h4>Total {records.length} records found</h4>
        ) : (
          ''
        )}
      </div>
      <div className='result-container'>
        {currentRecords.map((record) => (
          <ProductCard data={record} key={record._id} />
        ))}
      </div>
    </>
  );

  return (
    <div className='container-main'>
      <div className='search-container'>
        <form className='search-form' onSubmit={handleSubmit}>
          <input
            type='text'
            name='search'
            id='search'
            value={search}
            list="products"
            className='search-input'
            onChange={handleSearchChange}
            placeholder='eg. iphone 12'
          />
          <datalist id="products">
            {productArray.map((item) =>
            <option key={item} value={item} />
            )}
        </datalist>
          <button className='btn-search'>search</button>
        </form>
      </div>
      <div className='results'>
        {renderProducts}
        {records.length > 0 ? (
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={records.length}
            paginate={paginate}
          />
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default ProductListPage;
