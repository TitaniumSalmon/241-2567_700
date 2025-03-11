const BASE_URL = 'http://localhost:8000';
window.onload = async() => {
    await loadData();
}

const loadData = async() => {
    console.log('user page loaded');
    // 1. load user ทั้งหมดจาก api ที่เตรียมไว้
    const response = await axios.get(`${BASE_URL}/users`);
    console.log(response.data);
    const userDOM = document.getElementById('users');

    //2. นำ user ทั้งหมด โหลดกลับเข้าไปใน html
    let htmlData = `
    <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
            <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">First Name</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Name</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Edit</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delete</th>
            </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
    `;
    for (let i = 0; i < response.data.length; i++) {
        let user = response.data[i];
        htmlData += `
        <tr>
            <td class="px-6 py-4 whitespace-nowrap">${user.id}</td>
            <td class="px-6 py-4 whitespace-nowrap">${user.firstname}</td>
            <td class="px-6 py-4 whitespace-nowrap">${user.lastname}</td>
            <td class="px-6 py-4 whitespace-nowrap">
                <a href='index.html?id=${user.id}'>
                    <button class="text-indigo-600 hover:text-indigo-900">Edit</button>
                </a>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <button class="text-red-600 hover:text-red-900 delete" data-id='${user.id}'>Delete</button>
            </td>
        </tr>`;
    }
    htmlData += `
        </tbody>
    </table>`;
    userDOM.innerHTML = htmlData;

    //3. ลบ user
    const deleteDOMs = document.getElementsByClassName('delete');
    for (let i = 0; i < deleteDOMs.length; i++) {
        deleteDOMs[i].addEventListener('click', async(event) => {
            // ดึง id ของ user ที่ต้องการลบ
            const id = event.target.dataset.id;
            try{
                await axios.delete(`${BASE_URL}/users/${id}`);
                loadData(); //recursive function = เรียกใช้ฟังก์ชันตัวเอง
            } catch (error) {
                console.log('error', error);
            }
        });
    }
}