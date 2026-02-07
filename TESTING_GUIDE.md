# Testing Guide - HRMS Lite

Complete testing guide for HRMS Lite application.

## 🧪 Test Scenarios

### Employee Management Tests

#### 1. Add Employee
**Objective**: Verify employee creation works correctly

**Test Steps**:
1. Open the application
2. Navigate to Employees page
3. Click "➕ Add Employee"
4. Fill in the form:
   - Employee ID: `EMP001`
   - Full Name: `John Doe`
   - Email: `john@company.com`
   - Department: `IT`
5. Click "Add Employee"

**Expected Result**: 
- ✅ Employee appears in the table
- ✅ Success message displays
- ✅ Form closes

#### 2. Duplicate Employee ID
**Objective**: Prevent duplicate employee IDs

**Test Steps**:
1. Create an employee with ID `EMP001`
2. Try to create another employee with the same ID
3. Submit the form

**Expected Result**:
- ✅ Error message: "Employee ID "EMP001" already exists"
- ✅ Modal remains open (doesn't close)

#### 3. Invalid Email Format
**Objective**: Validate email format

**Test Steps**:
1. Open Add Employee modal
2. Enter email: `invalidemail` (without @)
3. Click "Add Employee"

**Expected Result**:
- ✅ Error message: "Invalid email format"
- ✅ Form doesn't submit

#### 4. Edit Employee
**Objective**: Verify employee edit functionality

**Test Steps**:
1. Click "✏️ Edit" on any employee
2. Change the Full Name to `Jane Doe`
3. Click "Update Employee"

**Expected Result**:
- ✅ Employee name updated in table
- ✅ Success message displays

#### 5. Delete Employee
**Objective**: Remove employee from system

**Test Steps**:
1. Click "🗑️ Delete" on any employee
2. Click OK on confirmation dialog
3. Wait for record to disappear

**Expected Result**:
- ✅ Employee removed from table
- ✅ Success message displays
- ✅ Attendance records also deleted (backend)

#### 6. Search Employees
**Objective**: Find employees by ID, name, or email

**Test Steps**:
1. Have multiple employees in the system
2. Type "EMP001" in search box
3. Observe filtered results
4. Clear search box

**Expected Result**:
- ✅ Table filters in real-time
- ✅ Shows only matching employees
- ✅ Full list returns when search cleared

### Attendance Management Tests

#### 7. Mark Attendance
**Objective**: Record attendance for an employee

**Test Steps**:
1. Navigate to Attendance page
2. Click "➕ Mark Attendance"
3. Select an employee
4. Select date (today)
5. Select status: "Present"
6. Click "Record Attendance"

**Expected Result**:
- ✅ Attendance record appears in table
- ✅ Success message displays
- ✅ Statistics update (Present count increases)

#### 8. Duplicate Attendance Record
**Objective**: Prevent duplicate attendance on same date

**Test Steps**:
1. Record attendance for EMP001 on 2024-02-07
2. Try to record same employee on same date again
3. Submit

**Expected Result**:
- ✅ Error message: "Attendance record already exists for this date"

#### 9. Attendance Status Options
**Objective**: Verify all status options work

**Test Steps**:
1. Record attendance with status: "Absent"
2. Record attendance with status: "Leave"
3. Verify badges show correct colors

**Expected Result**:
- ✅ Green badge for "Present"
- ✅ Red badge for "Absent"
- ✅ Orange badge for "Leave"

#### 10. Filter by Employee
**Objective**: View attendance for specific employee

**Test Steps**:
1. Have multiple employees with attendance records
2. Select employee filter: "John Doe"
3. Observe table

**Expected Result**:
- ✅ Shows only John Doe's records
- ✅ Statistics update to show only his data

#### 11. Filter by Date
**Objective**: View attendance for specific date

**Test Steps**:
1. Select filter date: "2024-02-07"
2. Observe filtered results
3. Clear filter

**Expected Result**:
- ✅ Shows only records from that date
- ✅ Full list returns when filter cleared

#### 12. Delete Attendance Record
**Objective**: Remove attendance record

**Test Steps**:
1. Click "🗑️ Delete" on any attendance record
2. Confirm deletion
3. Wait for record to disappear

**Expected Result**:
- ✅ Record removed from table
- ✅ Statistics update

### Dashboard Tests

#### 13. KPI Cards Display
**Objective**: Verify dashboard statistics

**Test Steps**:
1. Navigate to Dashboard
2. Observe KPI cards

**Expected Result**:
- ✅ Shows correct total employees count
- ✅ Shows today's present count
- ✅ Shows today's absent count
- ✅ Shows today's leave count

#### 14. Department Distribution
**Objective**: Check department breakdown

**Test Steps**:
1. Add employees to different departments
2. Check Dashboard > Department Distribution

**Expected Result**:
- ✅ Lists all departments used
- ✅ Shows employee count per department
- ✅ Progress bars display correctly

#### 15. Recent Attendance
**Objective**: View latest attendance records

**Test Steps**:
1. Record multiple attendance entries
2. Check Dashboard > Recent Attendance

**Expected Result**:
- ✅ Shows latest 10 records
- ✅ Latest records appear first
- ✅ All data displays correctly

### UI/UX Tests

#### 16. Responsive Design
**Objective**: Verify mobile responsiveness

**Test Steps**:
1. Open app in desktop (1920x1080)
2. Resize to tablet (768x1024)
3. Resize to mobile (375x667)
4. Test navigation on each size

**Expected Result**:
- ✅ Layout adapts to screen size
- ✅ All features accessible
- ✅ Text is readable
- ✅ Buttons are tappable

#### 17. Error Messages
**Objective**: Verify error handling

**Test Steps**:
1. Leave required field empty and submit
2. Enter invalid email and submit
3. Try to add duplicate ID

**Expected Result**:
- ✅ Clear error messages appear
- ✅ Messages describe the problem
- ✅ User can correct and retry

#### 18. Loading States
**Objective**: Verify loading indicators

**Test Steps**:
1. On initial page load
2. Perform API operations
3. Watch for spinner

**Expected Result**:
- ✅ Spinner appears during loading
- ✅ Data displays after loading
- ✅ No spinner when data is ready

#### 19. Empty States
**Objective**: Verify proper messaging for empty data

**Test Steps**:
1. Delete all employees
2. Check Employees page

**Expected Result**:
- ✅ Shows "No Employees Yet" message
- ✅ Shows action button to add first employee

#### 20. Modal Functionality
**Objective**: Verify modal works correctly

**Test Steps**:
1. Open any modal
2. Click outside modal
3. Verify modal closes
4. Open modal again
5. Click X button

**Expected Result**:
- ✅ Modal closes when clicking outside
- ✅ Modal closes when clicking X
- ✅ Modal opens and closes correctly

## 🔍 API Testing (Postman/cURL)

### Test Employee APIs

**Create Employee**
```bash
curl -X POST http://localhost:5000/api/employees \
  -H "Content-Type: application/json" \
  -d '{
    "employeeId": "EMP001",
    "fullName": "Test User",
    "email": "test@email.com",
    "department": "IT"
  }'
```

**Expected**: 201 status, employee data returned

**Get All Employees**
```bash
curl http://localhost:5000/api/employees
```

**Expected**: 200 status, array of employees

**Invalid Data**
```bash
curl -X POST http://localhost:5000/api/employees \
  -H "Content-Type: application/json" \
  -d '{
    "employeeId": "EMP001",
    "fullName": "",
    "email": "invalid",
    "department": "Invalid"
  }'
```

**Expected**: 400 status, error messages

## 🔄 Integration Tests

### Test Complete Flow

**Scenario**: Create employee, mark attendance, view in dashboard

1. Create employee from UI
2. Verify in Employees table
3. Mark attendance for this employee
4. Check attendance appears in Attendance page
5. Verify dashboard shows updated statistics

**Expected**:
- ✅ All operations complete without errors
- ✅ Data syncs across pages
- ✅ Statistics update in real-time

## ⚠️ Edge Cases

### Test Edge Cases

1. **Very long names**: Test with 100+ character names
2. **Special characters**: Test email with special characters
3. **Rapid clicking**: Click button multiple times rapidly
4. **Network latency**: Simulate slow network
5. **Concurrent operations**: Open multiple modals
6. **Large datasets**: Add 1000+ employees

## 📊 Performance Testing

### Metrics to Monitor

1. **Page Load Time**: Target < 2 seconds
2. **API Response Time**: Target < 500ms
3. **Database Query Time**: Target < 100ms
4. **Memory Usage**: Target < 50MB

### Test on Different Devices

- Desktop (Chrome, Firefox, Safari)
- Mobile (iPhone, Android)
- Tablet (iPad, Android tablet)
- Different browsers versions

## ✅ Final Verification Checklist

Before deployment:

- [ ] All 20 test scenarios pass
- [ ] No console errors
- [ ] All validations work
- [ ] API endpoints respond correctly
- [ ] Database operations successful
- [ ] Responsive design works
- [ ] Loading states display
- [ ] Error messages clear
- [ ] No memory leaks
- [ ] Performance acceptable

## 🐛 Known Issues & Workarounds

### Issue: CORS Error
**Solution**: 
- Check backend is running
- Verify API URL in frontend .env

### Issue: Database Connection Timeout
**Solution**:
- Check Render Postgres is active
- Verify connection string
- Check network connectivity

### Issue: Duplicate Attendance Not Prevented
**Solution**:
- Ensure Render Postgres is active
- Check database indexes

---

## 📝 Test Report Template

```
Test Date: 2024-02-07
Tester: [Name]
Environment: [Development/Staging/Production]
Browser: [Chrome/Firefox/Safari]
Device: [Desktop/Mobile/Tablet]

Test Results Summary:
✅ Passed: [number]
❌ Failed: [number]
⚠️  Skipped: [number]

Issues Found:
1. [Issue description]
   - Severity: [High/Medium/Low]
   - Steps to reproduce: [Steps]
   - Expected: [Expected behavior]
   - Actual: [Actual behavior]

</Recommendations>
- [Recommendation 1]
- [Recommendation 2]

Signed: [Name]
Date: [Date]
```

---

For any issues found during testing, create a GitHub issue with:
- Detailed description
- Steps to reproduce
- Expected vs actual behavior
- Browser/device information
- Screenshots if applicable
