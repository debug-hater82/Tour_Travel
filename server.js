// Import các thư viện cần thiết
const express = require('express');
const cors = require('cors');
const fs = require('fs');  // Sử dụng fs để lưu trữ dữ liệu vào file JSON

// Khởi tạo ứng dụng Express
const app = express();

// Sử dụng các middleware
app.use(cors());
app.use(express.json());  // Giúp phân tích cú pháp JSON từ body của request

// Đường dẫn lưu trữ dữ liệu người dùng
const usersFilePath = './users.json';
const contactFilePath = './data.json';
const productsFilePath = './product.json';  // Đường dẫn tới file sản phẩm
const ordersFilePath = './orders.json';  // Tệp lưu thông tin đơn hàng

// Đọc dữ liệu người dùng từ file
function readUsersFromFile() {
    if (fs.existsSync(usersFilePath)) {
        const data = fs.readFileSync(usersFilePath);
        return JSON.parse(data);
    } else {
        return [];
    }
}

// Đọc dữ liệu liên hệ từ file
function readContactFromFile() {
    if (fs.existsSync(contactFilePath)) {
        const data = fs.readFileSync(contactFilePath);
        return JSON.parse(data);
    } else {
        return [];
    }
}

// Đọc dữ liệu sản phẩm từ file
function readProductsFromFile() {
    if (fs.existsSync(productsFilePath)) {
        const data = fs.readFileSync(productsFilePath);
        return JSON.parse(data);
    } else {
        return [];
    }
}

// Đọc dữ liệu đơn hàng từ file
function readOrdersFromFile() {
    if (fs.existsSync(ordersFilePath)) {
        const data = fs.readFileSync(ordersFilePath);
        return JSON.parse(data);
    } else {
        return [];
    }
}

// Ghi dữ liệu người dùng vào file
function writeUsersToFile(users) {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
}

// Ghi dữ liệu liên hệ vào file
function writeContactToFile(contactData) {
    fs.writeFileSync(contactFilePath, JSON.stringify(contactData, null, 2));
}

// Ghi dữ liệu sản phẩm vào file
function writeProductsToFile(products) {
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
}

// Ghi dữ liệu đơn hàng vào file
function writeOrdersToFile(orders) {
    fs.writeFileSync(ordersFilePath, JSON.stringify(orders, null, 2));
}

// Định nghĩa route đăng ký người dùng
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;

    // Đọc danh sách người dùng hiện tại
    const users = readUsersFromFile();

    // Kiểm tra xem người dùng đã tồn tại hay chưa
    const userExists = users.some(user => user.email === email);
    if (userExists) {
        return res.status(400).send({ message: 'Email đã tồn tại' });
    }

    // Thêm người dùng mới vào danh sách
    const newUser = { username, email, password };
    users.push(newUser);

    // Ghi lại dữ liệu người dùng vào file
    writeUsersToFile(users);

    res.status(201).send({ message: 'Đăng ký thành công' });
});

// Định nghĩa route đăng nhập người dùng
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    console.log('Nhận yêu cầu đăng nhập từ:', email, password); // Log email và password

    // Đọc danh sách người dùng
    const users = readUsersFromFile();  // Không cần await ở đây vì readUsersFromFile là đồng bộ

    // Tìm người dùng với email và password khớp
    const user = users.find(user => user.email === email && user.password === password);

    if (!user) {
        console.log('Sai email hoặc mật khẩu');
        return res.status(400).send({ message: 'Sai email hoặc mật khẩu' });
    }

    console.log('Đăng nhập thành công:', user);
    res.send({ message: 'Đăng nhập thành công' });
});

// Định nghĩa route gửi thông tin liên hệ
app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;

    // Đọc dữ liệu liên hệ hiện tại
    const contactData = readContactFromFile();

    // Thêm thông tin liên hệ mới vào danh sách
    const newContact = { name, email, message, date: new Date() };
    contactData.push(newContact);

    // Ghi lại dữ liệu liên hệ vào file
    writeContactToFile(contactData);

    res.status(201).send({ message: 'Thông tin liên hệ đã được gửi thành công' });
});

// Định nghĩa route thêm sản phẩm
app.post('/product', (req, res) => {
    const { name, price, image, category, reviews } = req.body;

    // Đọc dữ liệu sản phẩm hiện tại
    const products = readProductsFromFile();

    // Tạo một đối tượng sản phẩm mới
    const newProduct = {
        name,
        price,
        image,
        category,
        reviews: category === 'foreign' ? reviews : null,  // Nếu là quốc tế, có reviews
    };

    // Thêm sản phẩm mới vào danh sách sản phẩm
    products.push(newProduct);

    // Ghi lại dữ liệu sản phẩm vào file
    writeProductsToFile(products);

    // Trả về phản hồi cho client
    res.status(201).send({ success: true, message: 'Sản phẩm đã được thêm thành công!' });
});

// Định nghĩa route lưu đơn hàng
app.post('/save-order', (req, res) => {
    const { productName, pricePerItem, quantity, total, customerName, customerPhone, customerAddress, customerNote } = req.body;

    // Đọc dữ liệu đơn hàng hiện tại
    const orders = readOrdersFromFile();

    // Tạo một đối tượng đơn hàng mới
    const newOrder = {
        productName,
        pricePerItem,
        quantity,
        total,
        customerName,
        customerPhone,
        customerAddress,
        customerNote,
        date: new Date().toISOString(),
    };

    // Thêm đơn hàng mới vào danh sách đơn hàng
    orders.push(newOrder);

    // Ghi lại dữ liệu đơn hàng vào file
    writeOrdersToFile(orders);

    // Trả về phản hồi cho client
    res.status(201).send({ message: 'Đơn hàng đã được lưu thành công!' });
});

// Khởi động server
app.listen(3000, () => {
    console.log('Server đang chạy trên http://localhost:3000');
});
