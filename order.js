document.addEventListener('DOMContentLoaded', () => {
    const quantityInput = document.getElementById('quantity');
    const totalElement = document.getElementById('total');
    const buyButton = document.querySelector('.checkout-form .buy-btn');
    const pricePerItem = 6000000; // Giá sản phẩm

    // Cập nhật tổng tiền khi thay đổi số lượng
    if (quantityInput && totalElement) {
        quantityInput.addEventListener('input', () => {
            const quantity = parseInt(quantityInput.value) || 1;
            const total = quantity * pricePerItem;
            totalElement.textContent = `${total.toLocaleString('vi-VN')} VNĐ`;
        });
    }

    // Xử lý sự kiện khi nhấn nút mua
    if (buyButton) {
        buyButton.addEventListener('click', async (e) => {
            e.preventDefault();  // Ngừng hành động mặc định

            // Lấy dữ liệu từ form
            const customerName = document.getElementById('name').value.trim();
            const customerPhone = document.getElementById('phone').value.trim();
            const customerAddress = document.getElementById('address').value.trim();
            const customerNote = document.getElementById('note').value.trim();
            const quantity = parseInt(quantityInput.value) || 1;
            const total = quantity * pricePerItem;

            if (!customerName || !customerPhone || !customerAddress) {
                alert('Vui lòng điền đầy đủ thông tin!');
                return;
            }

            const orderData = {
                productName: 'Hà Nội',
                pricePerItem,
                quantity,
                total,
                customerName,
                customerPhone,
                customerAddress,
                customerNote,
            };

            try {
                const response = await fetch('http://localhost:3000/save-order', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(orderData),
                });

                if (response.ok) {
                    alert('Đơn hàng đã được lưu thành công!');
                    // Reset form và cập nhật lại tổng tiền
                    document.querySelector('.checkout-form form').reset();
                    totalElement.textContent = `${pricePerItem.toLocaleString('vi-VN')} VNĐ`;
                } else {
                    alert('Đặt hàng thất bại, vui lòng thử lại.');
                }
            } catch (error) {
                console.error('Lỗi khi đặt hàng:', error);
                alert('Không thể kết nối đến server!');
            }
        });
    }
});
