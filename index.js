fetch("https://fakestoreapi.com/products")
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error("Error fetching data:", error));

  import { useState, useEffect } from "react";

export default function Products() {
    const [products, setProducts] = useState([]);  // Store fetched products
    const [loading, setLoading] = useState(true);  // Track loading state
    const [error, setError] = useState(null);      // Store error message

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await fetch("https://fakestoreapi.com/products");
                if (!response.ok) throw new Error("Failed to fetch data");
                
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);  // Stop loading once fetch is complete
            }
        }

        fetchProducts();
    }, []);  // Empty dependency array → Runs only once on mount

    if (loading) return <h2>Loading...</h2>;
    if (error) return <h2>Error: {error}</h2>;

    return (
        <div>
            <h1>Fake Store Products</h1>
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        <img src={product.image} alt={product.title} width="50" />
                        {product.title} - ${product.price}
                    </li>
                ))}
            </ul>
        </div>
    );
}
