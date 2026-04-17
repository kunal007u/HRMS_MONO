#!/bin/bash
PGPASSWORD="M2ASdOgeSQWA20L8pWKrk6gfXBeCrfB9" psql -h dpg-d70pslnafjfc73998sfg-a.onrender.com -U hrms_itz5_user -d hrms_itz5 -c "
INSERT INTO employees (
  id, firstName, lastName, email, password, isActive, roleId, 
  departmentId, designationId, dateOfJoining, phoneNumber, 
  employee_code, employeeType, pancardNo, aadharNo, uanNo, 
  workLocation, pfNo, gender, currentAddress, permanentAddress,
  emergencyContact, passportNumber, fatherName, motherName,
  nationality, experience, qualification, isProbationCompleted,
  createdAt, updatedAt
) VALUES (
  'a1234567-1234-1234-1234-123456789abc',
  'John',
  'Doe',
  'john.doe@example.com',
  '\$2b\$12\$3CatzZQCEKb364SkNvRJVuKp1BGXWZ0XMoh78YeNanlJkxkYrGhvi',
  true,
  '6e5f9a85-db29-4960-bba9-74a334fb3731',
  '91c1f9a3-b171-430f-b833-5a46a9334015',
  'f70e9f56-c4c6-44a6-b7fe-07a098e55336',
  '2024-01-01',
  '9876543210',
  'EMP001',
  'permanent',
  'AABPM5055K',
  '123456789012',
  '768736hjf',
  'Ahmedabad',
  '625321tghn',
  'male',
  '123 Main St, Ahmedabad',
  '123 Main St, Ahmedabad',
  '9876543211',
  'N1234567',
  'Robert Doe',
  'Mary Doe',
  'Indian',
  5,
  'B.E. in Computer Science',
  true,
  NOW(),
  NOW()
) ON CONFLICT (id) DO NOTHING;
"
