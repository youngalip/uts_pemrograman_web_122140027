import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader'; // Import Loader
import '../styles/ProductListPage.css';

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true); // Tambah state loading

  // Ambil semua kategori saat pertama kali load
  useEffect(() => {
    setLoading(true);
    fetch('https://fakestoreapi.com/products/categories')
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error('Failed to fetch categories:', err));
  }, []);

  // Ambil produk berdasarkan kategori
  useEffect(() => {
    setLoading(true);
    const url =
      selectedCategory === 'all'
        ? 'https://fakestoreapi.com/products'
        : `https://fakestoreapi.com/products/category/${selectedCategory}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch products:', err);
        setLoading(false);
      });
  }, [selectedCategory]);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <Loader />;

  return (
    <div className="product-page-wrapper">
      <h1 className="product-heading">Products Available</h1>

      <div className="filter-container">
        <label htmlFor="category-select">Kategori: </label>
        <select
          id="category-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">Semua</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Cari produk..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="product-list-container">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="no-results">Produk tidak ditemukan.</p>
        )}
      </div>
    </div>
  );
};

export default ProductListPage;
