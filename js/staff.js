function Staff(id, name, email, password, workday, salary, chooseposition, workhour){
    this.id = id
    this.name = name
    this.email = email
    this.password = password
    this.workday = workday
    this.salary = salary
    this.chooseposition = chooseposition
    this.workhour = workhour

    Staff.prototype.calcSalary = function(){
        if(this.chooseposition === "Sếp"){
            return this.salary * 3
        }else if(this.chooseposition === "Trưởng phòng"){
            return this.salary * 2
        }else if(this.chooseposition === "Nhân viên"){
            return this.salary * 1
        }
    }
    Staff.prototype.calcHour = function(){
        if(this.workhour >= 192){
            return `Nhân viên xuất sắc`
        }else if(this.workhour >= 176){
            return `Nhân viên giỏi`
        }else if(this.workhour >= 160){
            return `Nhân viên khá`
        }else if(this.workhour < 160){
            return `Nhân viên trung bình`
        }
            
    }
}