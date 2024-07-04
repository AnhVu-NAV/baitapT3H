function login(email, password) {
    if (!email || !password) {
        return "Hãy nhập đầy đủ thông tin";
    }

    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        return `Xin chào ${user.first_name} ${user.last_name}`;
    } else {
        return "Thông tin tài khoản không chính xác";
    }
}

function loginPrompt() {
    const email = prompt('Nhập email: ');
    const password = prompt('Nhập mật khẩu: ');
    const result = login(email, password);
    document.getElementById('output').innerText = result;
}

function register(first_name, last_name, email, password) {
    if (!first_name || !last_name || !email || !password) {
        return "Hãy nhập đầy đủ thông tin";
    }

    const userExists = users.some(user => user.email === email);

    if (userExists) {
        return "Email này đã có tài khoản";
    } else {
        const newId = users.length > 0 ? users[users.length - 1].id + 1 : 1;
        const newUser = { id: newId, first_name, last_name, email, password };
        users.push(newUser);
        return `Đăng ký thành công: ${newUser.first_name} ${newUser.last_name}`;
    }
}

function registerPrompt() {
    const first_name = prompt('Nhập tên: ');
    const last_name = prompt('Nhập họ: ');
    const email = prompt('Nhập email: ');
    const password = prompt('Nhập mật khẩu: ');
    const result = register(first_name, last_name, email, password);
    document.getElementById('output').innerText = result;
}

function viewUsers(keyword = '') {
    const filteredUsers = users.filter(user => 
        user.first_name.includes(keyword) || 
        user.last_name.includes(keyword) || 
        user.email.includes(keyword)
    );

    if (filteredUsers.length === 0) {
        return "Không có người dùng nào phù hợp.";
    } else {
        return filteredUsers.map(user => `ID: ${user.id}, Tên đầy đủ: ${user.first_name} ${user.last_name}, Email: ${user.email}`).join('\n');
    }
}

function viewUsersPrompt() {
    const keyword = prompt('Nhập từ khóa tìm kiếm: ');
    const result = viewUsers(keyword);
    document.getElementById('output').innerText = result;
}

function viewPosts() {
    const postList = posts.map(post => {
        const user = users.find(user => user.id === post.user_id);
        return `ID: ${post.id}, Title: ${post.title}, Ngày tạo: ${post.created_at}, Người tạo: ${user.first_name} ${user.last_name}`;
    }).join('\n');

    document.getElementById('output').innerText = postList;
}

function viewPostDetail(postId) {
    const post = posts.find(post => post.id === postId);

    if (post) {
        const user = users.find(user => user.id === post.user_id);
        return `ID: ${post.id}, Tiêu đề: ${post.title}, Nội dung: ${post.content}, Link ảnh: ${post.image}, Người tạo: ${user.first_name} ${user.last_name}, Ngày tạo: ${post.created_at}, Ngày sửa đổi: ${post.updated_at}`;
    } else {
        return "Bài viết không tồn tại";
    }
}

function viewPostDetailPrompt() {
    const postId = parseInt(prompt('Nhập ID của bài viết: '), 10);
    const result = viewPostDetail(postId);
    document.getElementById('output').innerText = result;
}

function searchPostsByUser(email) {
    const user = users.find(user => user.email === email);

    if (!user) {
        return "Người dùng không tồn tại";
    }

    const userPosts = posts.filter(post => post.user_id === user.id);

    if (userPosts.length === 0) {
        return "Người dùng này chưa có bài viết nào";
    } else {
        return userPosts.map(post => `ID: ${post.id}, Title: ${post.title}, Ngày tạo: ${post.created_at}`).join('\n');
    }
}

function searchPostsByUserPrompt() {
    const email = prompt('Nhập email của người dùng: ');
    const result = searchPostsByUser(email);
    document.getElementById('output').innerText = result;
}
