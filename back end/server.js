
const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

// Render port support
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Frontend
app.use(express.static(path.join(__dirname, "../front end")));

// Helper function to read JSON data
function readData(filePath) {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

// Helper function to save JSON data
function saveData(filePath, data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// Employee data
const employeeFile = path.join(__dirname, "../data/employees.json");

// Get employees
app.get("/api/employees", (req, res) => {
    res.json(readData(employeeFile));
});

// Add employee
app.post("/api/employees", (req, res) => {
    const employees = readData(employeeFile);

    const newEmployee = {
        id: Date.now(),
        name: req.body.name,
        employeeId: req.body.employeeId,
        department: req.body.department,
        designation: req.body.designation,
        salary: req.body.salary
    };

    employees.push(newEmployee);
    saveData(employeeFile, employees);

    res.json({
        success: true,
        message: "Employee added successfully",
        employee: newEmployee
    });
});

// Department data
const departmentFile = path.join(__dirname, "../data/departments.json");

// Get departments
app.get("/api/departments", (req, res) => {
    res.json(readData(departmentFile));
});

// Add department
app.post("/api/departments", (req, res) => {
    const departments = readData(departmentFile);

    const newDepartment = {
        id: Date.now(),
        name: req.body.name,
        head: req.body.head
    };

    departments.push(newDepartment);
    saveData(departmentFile, departments);

    res.json({
        success: true,
        message: "Department added successfully",
        department: newDepartment
    });
});

// Attendance data
const attendanceFile = path.join(__dirname, "../data/attendance.json");

// Get attendance records
app.get("/api/attendance", (req, res) => {
    res.json(readData(attendanceFile));
});

// Mark attendance
app.post("/api/attendance", (req, res) => {
    const attendance = readData(attendanceFile);

    const newAttendance = {
        id: Date.now(),
        employeeId: req.body.employeeId,
        date: req.body.date,
        status: req.body.status
    };

    attendance.push(newAttendance);
    saveData(attendanceFile, attendance);

    res.json({
        success: true,
        message: "Attendance marked successfully",
        attendance: newAttendance
    });
});

// Leave data
const leaveFile = path.join(__dirname, "../data/leave.json");

// Get leave records
app.get("/api/leaves", (req, res) => {
    res.json(readData(leaveFile));
});

// Apply leave
app.post("/api/leaves", (req, res) => {
    const leaves = readData(leaveFile);

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
    saveData(leaveFile, leaves);

    res.json({
        success: true,
        message: "Leave applied successfully",
        leave: newLeave
    });
});

// Salary data
const salaryFile = path.join(__dirname, "../data/salary.json");

// Get salary records
app.get("/api/salary", (req, res) => {
    res.json(readData(salaryFile));
});

// Add salary
app.post("/api/salary", (req, res) => {
    const salaries = readData(salaryFile);

    const basicSalary = Number(req.body.basicSalary);
    const allowance = Number(req.body.allowance);
    const deduction = Number(req.body.deduction);

    const netSalary = basicSalary + allowance - deduction;

    const newSalary = {
        id: Date.now(),
        employeeId: req.body.employeeId,
        basicSalary,
        allowance,
        deduction,
        netSalary
    };

    salaries.push(newSalary);
    saveData(salaryFile, salaries);

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
        return res.json({
            success: true,
            message: "Login successful!"
        });
    }

    res.json({
        success: false,
        message: "Invalid username or password"
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});