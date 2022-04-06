/* Your Code Here */
function createEmployeeRecord([firstName,familyName,title,payPerHour]){
    const employeeRecord = {
        'firstName' : firstName,
        'familyName' : familyName,
        'title' : title,
        'payPerHour' : payPerHour,
    };
    employeeRecord.timeInEvents = [];
    employeeRecord.timeOutEvents = [];
    return employeeRecord;
}

function createEmployeeRecords(employeeRecords){
    const records = [];
    employeeRecords.map(employeeRecord => records.push(createEmployeeRecord(employeeRecord)));
    return records;
}

function createTimeInEvent(date){
    const newEvent = {};
    newEvent.type = `TimeIn`;
    newEvent.date = [...date.slice(0,10)].join('');
    newEvent.hour = Number([...date.slice(-4)].join(''));
    this.timeInEvents.push(newEvent);
    return this;
}

function createTimeOutEvent(date){
    const newEvent = {};
    newEvent.type = `TimeOut`;
    newEvent.date = [...date.slice(0,10)].join('');
    newEvent.hour = Number([...date.slice(-4)].join(''));
    this.timeOutEvents.push(newEvent);
    return this;
}

function hoursWorkedOnDate(date){
    /*
    Argument(s)
        A date of the form "YYYY-MM-DD"
    Returns
        Hours worked, an Integer
    Behavior
        Given a date, find the number of hours elapsed between that date's timeInEvent and timeOutEvent
    */
        const hourIn = this.timeInEvents.find(event=>{
            if(event.date === date){
                return Number(event.hour);
            }
            });
          const hourOut = this.timeOutEvents.find(event=>{
            if(event.date === date){
                return Number(event.hour);
            }
            });
           const workHour = (hourOut.hour - hourIn.hour) * .01;
           return workHour;
}

function wagesEarnedOnDate(date){
    let payOwed = hoursWorkedOnDate.call(this,date) * this.payPerHour;
    return payOwed;
}
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(employeeRecords, firstName){
    /*
    Argument(s)
        srcArray: Array of employee records
        firstName: String representing a first name held in an employee record
    Returns
        Matching record or undefined
    Behavior
        Test the firstName field for a match with the firstName argument
*/
    const employee = employeeRecords.find(employee=>{
        return employee.firstName === firstName;
    });

    console.log(employee);
    return employee;
}

function calculatePayroll(employeeRecords){
    // we're using reduce again
    let moneyOwed = []
    for(let employee of employeeRecords){
        // allWagesFor(employee);
        moneyOwed.push(allWagesFor.call(employee));
    }
    return moneyOwed.reduce(
        (accumulation, value)=>{
            return accumulation + value;
        }
    )
}