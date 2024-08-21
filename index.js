function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
        firstName: firstName,
        familyName: familyName,
        title: title,
        payPerHour: payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    };
}

function createEmployeeRecords(employeeData) {
    return employeeData.map(createEmployeeRecord);
}

function createTimeInEvent(employeeRecord, dateStamp) {
    const [date, hour] = dateStamp.split(" ");
    const event = {
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    };
    employeeRecord.timeInEvents.push(event);
    return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateStamp) {
    const [date, hour] = dateStamp.split(" ");
    const event = {
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    };
    employeeRecord.timeOutEvents.push(event);
    return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, date) {
    const timeIn = employeeRecord.timeInEvents.find(event => event.date === date);
    const timeOut = employeeRecord.timeOutEvents.find(event => event.date === date);
    return (timeOut.hour - timeIn.hour) / 100;
}

function wagesEarnedOnDate(employeeRecord, date) {
    const hours = hoursWorkedOnDate(employeeRecord, date);
    return hours * employeeRecord.payPerHour;
}

function allWagesFor(employeeRecord) {
    return employeeRecord.timeInEvents.reduce((total, event) => {
        return total + wagesEarnedOnDate(employeeRecord, event.date);
    }, 0);
}

function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((total, record) => {
        return total + allWagesFor(record);
    }, 0);
}


