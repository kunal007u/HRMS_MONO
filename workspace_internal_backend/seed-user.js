require('dotenv').config();
const { Sequelize } = require('sequelize');
const bcrypt = require('bcrypt');

async function seedUser() {
  try {
    // Parse DATABASE_URL
    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl) {
      console.log('⚠️  DATABASE_URL not set, skipping user seed');
      process.exit(0);
    }

    console.log('🔄 Attempting to connect to database...');
    const sequelize = new Sequelize(dbUrl, {
      dialect: 'postgres',
      logging: false,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
      pool: {
        max: 2,
        min: 1,
        acquire: 30000,
        idle: 10000,
      },
    });

    // Test connection
    await sequelize.authenticate();
    console.log('✅ Database connected successfully');

    // Define Employees model
    const Employees = sequelize.define('employees', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
      },
      firstName: Sequelize.STRING,
      lastName: Sequelize.STRING,
      email: {
        type: Sequelize.STRING,
        unique: true,
      },
      password: Sequelize.STRING,
      isActive: Sequelize.BOOLEAN,
      roleId: Sequelize.UUID,
      departmentId: Sequelize.UUID,
      designationId: Sequelize.UUID,
      dateOfJoining: Sequelize.DATEONLY,
      phoneNumber: Sequelize.STRING,
      employee_code: Sequelize.STRING,
      employeeType: Sequelize.STRING,
      pancardNo: Sequelize.STRING,
      aadharNo: Sequelize.STRING,
      uanNo: Sequelize.STRING,
      workLocation: Sequelize.STRING,
      pfNo: Sequelize.STRING,
      gender: Sequelize.STRING,
      currentAddress: Sequelize.TEXT,
      permanentAddress: Sequelize.TEXT,
      emergencyContact: Sequelize.STRING,
      passportNumber: Sequelize.STRING,
      fatherName: Sequelize.STRING,
      motherName: Sequelize.STRING,
      nationality: Sequelize.STRING,
      experience: Sequelize.INTEGER,
      qualification: Sequelize.STRING,
      isProbationCompleted: Sequelize.BOOLEAN,
      sessionId: Sequelize.UUID,
      deletedAt: Sequelize.DATE,
    }, {
      timestamps: true,
      tableName: 'employees',
      underscored: false,
    });

    // Check if user already exists
    const existingUser = await Employees.findOne({
      where: { email: 'john.doe@example.com' },
      raw: true,
    });

    if (existingUser) {
      console.log('✅ User john.doe@example.com already exists in database');
      await sequelize.close();
      process.exit(0);
    }

    // Hash password
    const hashedPassword = bcrypt.hashSync('Test@123', 12);

    // Insert the user
    await Employees.create({
      id: 'a1234567-1234-1234-1234-123456789abc',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: hashedPassword,
      isActive: true,
      roleId: '6e5f9a85-db29-4960-bba9-74a334fb3731',
      departmentId: '91c1f9a3-b171-430f-b833-5a46a9334015',
      designationId: 'f70e9f56-c4c6-44a6-b7fe-07a098e55336',
      dateOfJoining: '2024-01-01',
      phoneNumber: '9876543210',
      employee_code: 'EMP001',
      employeeType: 'permanent',
      pancardNo: 'AABPM5055K',
      aadharNo: '123456789012',
      uanNo: '768736hjf',
      workLocation: 'Ahmedabad',
      pfNo: '625321tghn',
      gender: 'male',
      currentAddress: '123 Main St, Ahmedabad',
      permanentAddress: '123 Main St, Ahmedabad',
      emergencyContact: '9876543211',
      passportNumber: 'N1234567',
      fatherName: 'Robert Doe',
      motherName: 'Mary Doe',
      nationality: 'Indian',
      experience: 5,
      qualification: 'B.E. in Computer Science',
      isProbationCompleted: true,
      sessionId: null,
    });

    console.log('✅ User john.doe@example.com created successfully!');
    console.log('📧 Email: john.doe@example.com');
    console.log('🔐 Password: Test@123');
    
    await sequelize.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    // Don't block app startup on seeding error
    process.exit(0);
  }
}

// Run if this file is executed directly
if (require.main === module) {
  seedUser();
}

module.exports = seedUser;
