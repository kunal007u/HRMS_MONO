require('dotenv').config();
const { Sequelize } = require('sequelize');
const bcrypt = require('bcrypt');

const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgresql://localhost:5432/hrms', {
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: process.env.DATABASE_URL ? {
      require: true,
      rejectUnauthorized: false,
    } : false,
  },
});

// Define Employees model
const Employees = sequelize.define('employees', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  email: {
    type: Sequelize.STRING,
    unique: true,
    lowercase: true,
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
  currentAddress: Sequelize.STRING,
  permanentAddress: Sequelize.STRING,
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
});

async function seedUser() {
  try {
    // Test connection
    await sequelize.authenticate();
    console.log('✅ Database connected successfully');

    const hashedPassword = bcrypt.hashSync('Test@123', 12);

    // Check if user already exists
    const existingUser = await Employees.findOne({
      where: { email: 'john.doe@example.com' },
    });

    if (existingUser) {
      console.log('✅ User john.doe@example.com already exists');
      process.exit(0);
    }

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

    console.log('✅ User john.doe@example.com created successfully with password: Test@123');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding user:', error.message);
    // Don't fail the process, just log the error
    process.exit(0);
  }
}

seedUser();
