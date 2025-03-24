// Lắng nghe sự kiện thay đổi danh mục (quốc nội/quốc tế)
document.getElementById('category').addEventListener('change', function() {
    const category = this.value;
    const reviewsContainer = document.getElementById('reviews-container');

    if (category === 'foreign') {
        // Hiển thị trường reviews khi chọn "Du lịch quốc tế"
        reviewsContainer.style.display = 'block';
    } else {
        // Ẩn trường reviews khi chọn "Du lịch nội địa"
        reviewsContainer.style.display = 'none';
    }
});

// Lắng nghe sự kiện submit từ form
document.getElementById('add-product-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Ngừng sự kiện mặc định (reload trang)

    // Lấy dữ liệu từ form
    const name = document.getElementById('name').value;
    const price = parseInt(document.getElementById('price').value);
    const image = document.getElementById('image').value;
    const category = document.getElementById('category').value;
    const reviews = category === 'foreign' ? parseInt(document.getElementById('reviews').value) : null;

    // Tạo đối tượng sản phẩm mới
    const newProduct = {
        name,
        price,
        image,
        category,
        reviews
    };

    // Kiểm tra tính hợp lệ của dữ liệu
    if (name && price && image && category) {
        // Gửi dữ liệu qua API hoặc cập nhật trực tiếp vào JSON (giả sử có file JSON local)
        saveProductToJSON(newProduct);
    } else {
        alert('Vui lòng điền đầy đủ thông tin sản phẩm!');
    }
});

// Hàm lưu sản phẩm mới vào JSON (Gửi dữ liệu đến server)
function saveProductToJSON(newProduct) {
    fetch('http://localhost:3000/product', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProduct)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById('message').textContent = 'Sản phẩm đã được thêm thành công!';
            // Reset form sau khi thêm thành công
            document.getElementById('add-product-form').reset();
        } else {
            document.getElementById('message').textContent = 'Có lỗi xảy ra khi thêm sản phẩm!';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('message').textContent = 'Lỗi kết nối đến server!';
    });
}
