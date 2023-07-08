//Danh sách nhân viên
let staffs = []

function addStaff(){
   let staff = validate()
   if(!staff){
    return
   }

    //Push obj staff lên mảng staffs
    staffs.push(staff)
    
    //Hiển thị lên giao diện
    display(staffs)
}
//Hàm xóa nhân viên
function removeStaff(staffId){
     staffs = staffs.filter((value) =>{
        return value.id !== staffId
    })
    display(staffs)
}

function selectStaff(staffId){
    $('#myModal').modal('show')
    let staffs = staffs.find((value) =>{
        return value.id === staffId
    })
    document.getElementById("tknv").value = staff.id
    document.getElementById("name").value = staff.name
    document.getElementById("email").value = staff.email
    document.getElementById("password").value = staff.password
    document.getElementById("datepicker").value = staff.workday
    document.getElementById("luongCB").value = staff.salary
    document.getElementById("chucvu").value = staff.chooseposition
    document.getElementById("gioLam").value = staff.workhour

    document.getElementById("tknv").disable = true
}
//Hàm update thông tin 
function updateStaff(){
    // DOM
    let id = document.getElementById("tknv").value
    let name = document.getElementById("name").value
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value
    let workday = document.getElementById("datepicker").value
    let salary = +document.getElementById("luongCB").value
    let chooseposition = document.getElementById("chucvu").value
    let workhour = +document.getElementById("gioLam").value

    //Khởi tạo đối tượng Staff
    let staff = new Staff(id, name, email, password, workday, salary, chooseposition, workhour)

    let index = staffs.findIndex((value) => {
        return value.id === id
    })
    staffs[index] = staff
    display(staffs)
}
//hàm hiển thị lên giao diện
function display(staffs){
    let html = staffs.reduce((result, value) =>{
        return result + `
        <tr>
        <td>${value.id}</td>
        <td>${value.name}</td>
        <td>${value.email}</td>
        <td>${value.workday}</td>
        <td>${value.chooseposition}</td>
        <td>${value.calcSalary()}</td>
        <td>${value.calcHour()}</td>
        <td>
            <button class="btn btn-primary mb-2"
            onclick="selectStaff('${value.id}')">Chỉnh sửa</button>
            <button class="btn btn-danger" onclick="removeStaff('${value.id}')">Xóa</button>
        </td>
        </tr>`
    }, "")
    document.getElementById("tableDanhSach").innerHTML = html
}

//Hàm tìm kiếm nhân viên theo loại
// function findStaff(){
//     let search = document.getElementById("searchName").value
//     search = search.trim().toLowercase()
//     let newStaff = staffs.filter((value) => {

//     })
// }

// Validate
function isRequired(value){
    if(!value.trim()){
        return false
    }
    return true
}
//Hàm kiểm tra lương
function isSal(value){
    if(isNaN(value)){
        return false
    }
    if(value < 1e6 || value > 20e6){
        return false
    }
    return true
}
//Hàm kiểm tra tài khoản
function isId(value){
    if(isNaN(value)){
        return false
    }
    if(value.length >= 4 && value.length <= 6){
        return true
    } else{
        return false
    }
}
// Hàm kiểm tra tên nhân viên
function isName(value){
    let regex = /^[a-zA-Z]+$/
    return regex.test(value)
}
//Hàm kiểm tra email
function isEmail(value){
    let regex = 
    /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/

    return regex.test(value)
}
// Hàm kiểm tra password
function isPassword(value){
    let regex = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=.{6,10})/
    return regex.test(value)
}
// Hàm kiểm tra giờ làm
function isWorkhour(value){
    if(isNaN(value)){
        return false
    }
    if(value < 80 || value > 200){
        return false
    }
    return true
}
function validate(){
    let id = document.getElementById("tknv").value
    let name = document.getElementById("name").value
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value
    let workday = document.getElementById("datepicker").value
    let salary = document.getElementById("luongCB").value
    let chooseposition = document.getElementById("chucvu").value
    let workhour = document.getElementById("gioLam").value


    let isValid = true
    //
    let spanId = document.getElementById("tbTKNV")
    if(!isRequired(id)){
        isValid = false
        spanId.innerHTML = "Tài khoản không được để trống"
        spanId.style.display = "block"
    }else if(!isId(id)){
        isValid = false
        spanId.innerHTML = "Hãy nhập tài khoảng có từ 4-6 ký số"
    }
    else{
        spanId.style.display = "none"
    }
    //
    let spanName = document.getElementById("tbTen")
    if(!isRequired(name)){
        isValid = false
        spanName.innerHTML = "Tên không được để trống"
        spanName.style.display = "block"
    }else if(!isName(name)){
        isValid = false
        spanName.innerHTML = "Vui lòng nhập chữ"
    }
    else{
        spanName.style.display = "none"
    }
    //
    let spanMail = document.getElementById("tbEmail")
    if(!isRequired(email)){
        isValid = false
        spanMail.innerHTML = "Email không được để trống"
        spanMail.style.display = "block"   
    } else if(!isEmail(email)){
        isValid = false
        spanMail.innerHTML = "Email nhập chưa chính xác"
    }
    else{
        spanMail.style.display = "none"
    }
    //
    let passSpan =  document.getElementById("tbMatKhau")
    if(!isRequired(password)){
        isValid = false
        passSpan.innerHTML = "Mật khẩu không được để trống"
        passSpan.style.display = "block"
    } else if(!isPassword(password)){
        isValid = false
        passSpan.innerHTML = "Mật khẩu không hợp lệ"
    }
    else{
        passSpan.style.display = "none"
    }
    //
    let wordaySpan = document.getElementById("tbNgay")
    if(!isRequired(workday)){
        isValid = false
        wordaySpan.innerHTML = "Vui lòng nhập ngày"
        wordaySpan.style.display = "block"
    }else{
        wordaySpan.style.display = "none"
    }
    //
    let salSpan = document.getElementById("tbLuongCB")
    if(!isRequired(salary)){
        isValid = false
        salSpan.innerHTML = "Vui lòng nhập lương"
        salSpan.style.display = "block"
    } else if(!isSal(+salary)){
        isValid = false
        salSpan.innerHTML = "Vui lòng nhập lương hợp lệ"
    }else{
        salSpan.style.display = "none"
    }
    //
    let selectposSpan = document.getElementById("tbChucVu")
    if(!isRequired(chooseposition)){
        isValid = false
        selectposSpan.innerHTML = "Vui lòng chọn chức vụ"
        selectposSpan.style.display = "block"
    } else{
        selectposSpan.style.display = "none"
    } 
    //
    let workhourSpan =  document.getElementById("tbGiolam")
    if(!isRequired(workhour)){
        isValid = false
        workhourSpan.innerHTML = "Vui lòng nhập giờ làm"
        workhourSpan.style.display = "block"
    } else if(!isWorkhour(+workhour)){
        isValid = false
        workhourSpan.innerHTML = "Vui lòng nhập giờ hợp lệ"
    }
    else{
        workhourSpan.style.display = "none"
    }
    if(isValid){
        let staff = new Staff(id, name, email, password, workday, +salary, chooseposition, +workhour);
        return staff
    }
    return undefined
    
}
document.getElementById("tknv").oninput = (event) =>{
    let spanId = document.getElementById("tbTKNV")
    if(!isRequired(event.target.value)){
        spanId.innerHTML = ""
    } else{
        spanId.innerHTML = "Tài khoản không được để trống"
    }
    if(!isId(event.target.value)){
        spanId.innerHTML = ""
    }else{
        spanId.innerHTML = "Hãy nhập tài khoản có từ 4-6 ký số"
    }
}
document.getElementById("name").oninput = (event) =>{
    let spanName = document.getElementById("tbTen")
    if(!isRequired(event.target.value)){
        spanName.innerHTML = ""
    } else{
        spanName.innerHTML = "Tài khoản không được để trống"
    }
    if(!isName(event.target.value)){
        spanName.innerHTML = ""
    }else{
        spanName.innerHTML = "Vui lòng nhập chữ"
    }
}
document.getElementById("email").oninput = (event) =>{
    let spanMail = document.getElementById("tbEmail")
    if(!isRequired(event.target.value)){
        spanMail.innerHTML = ""
    } else{
        spanMail.innerHTML = "Email không được để trống"
    }
    if(!isName(event.target.value)){
        spanMail.innerHTML = ""
    }else{
        spanMail.innerHTML = "Email nhập chưa chính xác"
    }
}
document.getElementById("password").oninput = (event) =>{
    let passSpan =  document.getElementById("tbMatKhau")
    if(!isRequired(event.target.value)){
        passSpan.innerHTML = ""
    } else{
        passSpan.innerHTML = "Mật khẩu không được để trống"
    }
    if(!isPassword(event.target.value)){
        passSpan.innerHTML = ""
    }else{
        passSpan.innerHTML = "Mật khẩu không hợp lệ"
    }
}
document.getElementById("datepicker").oninput = (event) =>{
    let wordaySpan = document.getElementById("tbNgay")
    if(!isRequired(event.target.value)){
        wordaySpan.innerHTML = ""
    } else{
        wordaySpan.innerHTML = "Vui lòng nhập ngày"
    }
}
document.getElementById("luongCB").oninput = (event) =>{
    let salSpan = document.getElementById("tbLuongCB")
    if(!isRequired(event.target.value)){
        salSpan.innerHTML = ""
    } else{
        salSpan.innerHTML = "Vui lòng nhập lương"
    }
    if(!isSal(event.target.value)){
        salSpan.innerHTML = ""
    }else{
        salSpan.innerHTML = "Vui lòng nhập lương hợp lệ"
    }
}
document.getElementById("chucvu").oninput = (event) =>{
    let selectposSpan = document.getElementById("tbChucVu")
    if(!isRequired(event.target.value)){
        selectposSpan.innerHTML = ""
    } else{
        selectposSpan.innerHTML = "Vui lòng chọn chức vụ"
    }
}
document.getElementById("gioLam").oninput = (event) =>{
    let workhourSpan =  document.getElementById("tbGiolam")
    if(!isRequired(event.target.value)){
        workhourSpan.innerHTML = ""
    } else{
        workhourSpan.innerHTML = "Vui lòng nhập giờ làm"
    }
    if(!isWorkhour(event.target.value)){
        workhourSpan.innerHTML = ""
    }else{
        workhourSpan.innerHTML = "Vui lòng nhập giờ hợp lệ"
    }
}
