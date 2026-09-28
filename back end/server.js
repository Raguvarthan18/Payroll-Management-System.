const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 5000;

app.use(express.json());

// Frontend
app.use(express.static(path.join(__dirname, "../front end")));

// Employee data file
const employeeFile = path.join(__dirname, "../data/employees.json");

// Get all employees
app.get("/api/employees", (req, res) => {

    const employees = JSON.parse(
        fs.readFileSync(employeeFile, "utf8")
    );

    res.json(employees);
});

// Add employee
app.post("/api/employees", (req, res) => {

    const employees = JSON.parse(
        fs.readFileSync(employeeFile, "utf8")
    );

    const newEmployee = {
        id: Date.now(),
        name: req.body.name,
        employeeId: req.body.employeeId,
        department: req.body.department,
        designation: req.body.designation,
        salary: req.body.salary
    };

    employees.push(newEmployee);

    fs.writeFileSync(
        employeeFile,
        JSON.stringify(employees, null, 2)
    );

    res.json({
        success: true,
        message: "Employee added successfully",
        employee: newEmployee
    });
});
// Department data file
const departmentFile = path.join(__dirname, "../data/departments.json");

// Get all departments
app.get("/api/departments", (req, res) => {

    const departments = JSON.parse(
        fs.readFileSync(departmentFile, "utf8")
    );

    res.json(departments);
});

// Add department
app.post("/api/departments", (req, res) => {

    const departments = JSON.parse(
        fs.readFileSync(departmentFile, "utf8")
    );

    const newDepartment = {
        id: Date.now(),
        name: req.body.name,
        head: req.body.head
    };

    departments.push(newDepartment);

    fs.writeFileSync(
        departmentFile,
        JSON.stringify(departments, null, 2)
    );

    res.json({
        success: true,
        message: "Department added successfully",
        department: newDepartment
    });
});
// Attendance data file
const attendanceFile = path.join(__dirname, "../data/attendance.json");

// Get all attendance records
app.get("/api/attendance", (req, res) => {

    const attendance = JSON.parse(
        fs.readFileSync(attendanceFile, "utf8")
    );

    res.json(attendance);
});

// Mark attendance
app.post("/api/attendance", (req, res) => {

    const attendance = JSON.parse(
        fs.readFileSync(attendanceFile, "utf8")
    );

    const newAttendance = {
        id: Date.now(),
        employeeId: req.body.employeeId,
        date: req.body.date,
        status: req.body.status
    };

    attendance.push(newAttendance);

    fs.writeFileSync(
        attendanceFile,
        JSON.stringify(attendance, null, 2)
    );

    res.json({
        success: true,
        message: "Attendance marked successfully",
        attendance: newAttendance
    });
});
// Leave data file
const leaveFile = path.join(__dirname, "../data/leave.json");

// Get all leave records
app.get("/api/leaves", (req, res) => {

    const leaves = JSON.parse(
        fs.readFileSync(leaveFile, "utf8")
    );

    res.json(leaves);
});

// Apply leave
app.post("/api/leaves", (req, res) => {

    const leaves = JSON.parse(
        fs.readFileSync(leaveFile, "utf8")
    );

    const newLeave = {
        id: Date.now(),
        employeeId: req.body.employeeId,
        leaveType: req.body.leaveType,
        fromDate: req.body.fromDate,
        toDate: req.body.toDate,
        reason: req.body.reason,
        status: "Pending"
    };

    leaves.push(newLeave);

    fs.writeFileSync(
        leaveFile,
        JSON.stringify(leaves, null, 2)
    );

    res.json({
        success: true,
        message: "Leave applied successfully",
        leave: newLeave
    });
});
// Salary data file
const salaryFile = path.join(__dirname, "../data/salary.json");

// Get all salary records
app.get("/api/salary", (req, res) => {

    const salaries = JSON.parse(
        fs.readFileSync(salaryFile, "utf8")
    );

    res.json(salaries);
});

// Add salary
app.post("/api/salary", (req, res) => {

    const salaries = JSON.parse(
        fs.readFileSync(salaryFile, "utf8")
    );

    const basicSalary = Number(req.body.basicSalary);
    const allowance = Number(req.body.allowance);
    const deduction = Number(req.body.deduction);

    const netSalary =
        basicSalary + allowance - deduction;

    const newSalary = {
        id: Date.now(),
        employeeId: req.body.employeeId,
        basicSalary: basicSalary,
        allowance: allowance,
        deduction: deduction,
        netSalary: netSalary
    };

    salaries.push(newSalary);

    fs.writeFileSync(
        salaryFile,
        JSON.stringify(salaries, null, 2)
    );

    res.json({
        success: true,
        message: "Salary saved successfully",
        salary: newSalary
    });
});
// Login
app.post("/api/login", (req, res) => {

    const { username, password } = req.body;

    if (username === "admin" && password === "admin123") {

        res.json({
            success: true,
            message: "Login successful!"
        });

    } else {

        res.json({
            success: false,
            message: "Invalid username or password"
        });

    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});