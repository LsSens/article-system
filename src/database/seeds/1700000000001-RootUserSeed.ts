import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../../entities/user.entity';
import { Permission } from '../../entities/permission.entity';

export async function seedUsers(dataSource: DataSource): Promise<void> {
  const userRepository = dataSource.getRepository(User);
  const permissionRepository = dataSource.getRepository(Permission);

  const adminPermission = await permissionRepository.findOne({
    where: { name: 'admin' },
  });

  const editorPermission = await permissionRepository.findOne({
    where: { name: 'editor' },
  });

  const readerPermission = await permissionRepository.findOne({
    where: { name: 'reader' },
  });

  if (!adminPermission || !editorPermission || !readerPermission) {
    throw new Error(
      'Permissions not found. Please run permissions seed first.',
    );
  }

  const users = [
    {
      name: 'Root Admin',
      email: 'admin@example.com',
      password: 'admin123',
      permission: adminPermission,
    },
    {
      name: 'Editor User',
      email: 'editor@example.com',
      password: 'editor123',
      permission: editorPermission,
    },
    {
      name: 'Reader User',
      email: 'reader@example.com',
      password: 'reader123',
      permission: readerPermission,
    },
  ];

  for (const userData of users) {
    const existingUser = await userRepository.findOne({
      where: { email: userData.email },
    });

    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(userData.password, 10);

      const user = userRepository.create({
        name: userData.name,
        email: userData.email,
        password: hashedPassword,
        permissionId: userData.permission.id,
      });

      await userRepository.save(user);
    }
  }
}
