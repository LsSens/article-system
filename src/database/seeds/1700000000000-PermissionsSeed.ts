import { DataSource } from 'typeorm';
import { Permission } from '../../entities/permission.entity';

export async function seedPermissions(dataSource: DataSource): Promise<void> {
  const permissionRepository = dataSource.getRepository(Permission);

  const permissions = [
    {
      name: 'admin',
      description:
        'Permission to administer articles and users. Actions: Read, Create, Edit and Delete articles and users.',
    },
    {
      name: 'editor',
      description:
        'Permission to administer articles. Actions: Read, Create, Edit and Delete articles.',
    },
    {
      name: 'reader',
      description: 'Permission to only read articles. Actions: Read articles.',
    },
  ];

  for (const permissionData of permissions) {
    const existingPermission = await permissionRepository.findOne({
      where: { name: permissionData.name },
    });

    if (!existingPermission) {
      const permission = permissionRepository.create(permissionData);
      await permissionRepository.save(permission);
    }
  }
}
