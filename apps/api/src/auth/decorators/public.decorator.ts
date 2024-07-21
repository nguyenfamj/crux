import { SetMetadata } from '@nestjs/common';

export const PUBLIC_ROUTE_METADATA_KEY = 'is_public';
export const Public = () => SetMetadata(PUBLIC_ROUTE_METADATA_KEY, true);
