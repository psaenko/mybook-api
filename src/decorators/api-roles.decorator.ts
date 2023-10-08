import { applyDecorators, SetMetadata } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

export function ApiRoles(...roles: string[]) {
	return applyDecorators(
		SetMetadata('roles', roles),
		ApiOperation({ description: `**Allowed roles:** ${roles.join(', ')}` }),
	);
}
