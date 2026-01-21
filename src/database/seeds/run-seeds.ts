import { AppDataSource } from '../data-source';
import { seedPermissions } from './1700000000000-PermissionsSeed';
import { seedUsers } from './1700000000001-RootUserSeed';

async function runSeeds() {
  try {
    await AppDataSource.initialize();
    console.log('Database connection initialized');

    await seedPermissions(AppDataSource);
    console.log('Permissions seeded successfully');

    await seedUsers(AppDataSource);
    console.log('Users seeded successfully');

    await AppDataSource.destroy();
    console.log('Seeds completed successfully');
  } catch (error) {
    console.error('Error running seeds:', error);
    process.exit(1);
  }
}

runSeeds();
