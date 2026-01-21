import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../../entities/user.entity';
import { Permission } from '../../entities/permission.entity';

export async function seedRootUser(dataSource: DataSource): Promise<void> {
  const userRepository = dataSource.getRepository(User);
  const permissionRepository = dataSource.getRepository(Permission);

  const adminPermission = await permissionRepository.findOne({
    where: { name: 'admin' },
  });

  if (!adminPermission) {
    throw new Error('Admin permission not found. Please run permissions seed first.');
  }

  const existingRoot = await userRepository.findOne({
    where: { email: 'root@admin.com' },
  });

  if (!existingRoot) {
    const hashedPassword = await bcrypt.hash('root123', 10);

    const rootUser = userRepository.create({
      name: 'Root Admin',
      email: 'root@admin.com',
      password: hashedPassword,
      permissionId: adminPermission.id,
    });

    await userRepository.save(rootUser);
  }
}
