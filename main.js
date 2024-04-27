let productList = document.getElementById("product-list")
let sortSelect = document.getElementById("Sort")
let searchInput = document.getElementById("input")
let categoryFilter = document.getElementById("Categories")

let products = []

async function fetchProducts(){
  try {
    const response = await fetch('https://fakestoreapi.com/products')
    products = await response.json();
    displayProducts(products);
    populatedcategories(products)
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}


function displayProducts(products) {
  productList.innerHTML = ''
  products.forEach(product => {
    const productItem = document.createElement('div')
    productItem.classList.add("product-item");
    productItem.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <h3>${product.title}</h3>
      <p>Price: $${product.price}</p>
    `;

    productList.appendChild(productItem)
  })
}

// Filter

function populatedcategories(products) {
  const categories = ['all', ...new Set(products.map(product => product.category))];
    categoryFilter.innerHTML = '';
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category === 'all' ? 'All Categories' : category;
        categoryFilter.appendChild(option);
    });
}


categoryFilter.addEventListener('change', () => {
  const category = categoryFilter.value;
  const filteredProducts = category === 'all' ? products : products.filter(product => product.category === category);
    displayProducts(filteredProducts);
})

searchInput.addEventListener('input', () => {
  const searchTerm = searchInput.value.trim().toLowerCase();
    const filteredProducts = products.filter(product => product.title.toLowerCase().includes(searchTerm));
    displayProducts(filteredProducts);
})

sortSelect.addEventListener('change', () => {
  const sortOrder = sortSelect.value;
  const sortedProducts = [...products].sort((a, b) => sortOrder === 'asc' ? a.price - b.price : b.price - a.price);
  displayProducts(sortedProducts);
});

fetchProducts();