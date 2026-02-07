require('dotenv').config();
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

async function setupDatabase() {
  try {
    console.log('📦 Connecting to database...');
    
    const schemaPath = path.join(__dirname, 'database', 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    console.log('🚀 Creating tables...');
    await pool.query(schema);
    
    console.log('✅ Database setup complete!');
    console.log('✅ Tables created: employees, attendance');
    
    await pool.end();
  } catch (error) {
    console.error('❌ Error setting up database:');
    console.error(error.message);
    await pool.end();
    process.exit(1);
  }
}

setupDatabase();
