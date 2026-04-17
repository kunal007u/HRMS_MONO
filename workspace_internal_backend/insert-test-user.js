require('dotenv').config();
const { Client } = require('pg');
const bcrypt = require('bcrypt');

async function insertUser() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  try {
    console.log('🔄 Connecting to database...');
    await client.connect();
    console.log('✅ Connected to database');

    const hashedPassword = bcrypt.hashSync('Test@123', 12);
    
    // First check if user exists
    const checkQuery = `
      SELECT id FROM employees WHERE email = 'john.doe@example.com' LIMIT 1;
    `;
    
    const checkResult = await client.query(checkQuery);
    
    if (checkResult.rows.length > 0) {
      console.log('✅ User john.doe@example.com already exists in database');
      await client.end();
      process.exit(0);
    }

    // Insert user
    const insertQuery = `
      INSERT INTO employees (
        id, firstName, lastName, email, password, isActive, roleId, 
        departmentId, designationId, dateOfJoining, phoneNumber, 
        employee_code, employeeType, pancardNo, aadharNo, uanNo, 
        workLocation, pfNo, gender, currentAddress, permanentAddress,
        emergencyContact, passportNumber, fatherName, motherName,
        nationality, experience, qualification, isProbationCompleted,
        "createdAt", "updatedAt"
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, 
        $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, 
        $25, $26, $27, $28, $29, $30
      )
      ON CONFLICT (id) DO NOTHING;
    `;

    const values = [
      'a1234567-1234-1234-1234-123456789abc',
      'John',
      'Doe',
      'john.doe@example.com',
      hashedPassword,
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
      new Date(),
      new Date()
    ];

    const result = await client.query(insertQuery, values);
    
    if (result.rowCount > 0) {
      console.log('✅ User john.doe@example.com created successfully!');
      console.log('📧 Email: john.doe@example.com');
      console.log('🔐 Password: Test@123');
    } else {
      console.log('✅ User already exists or was not created (no duplicates)');
    }

    await client.end();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error);
    await client.end();
    process.exit(0);
  }
}

insertUser();
