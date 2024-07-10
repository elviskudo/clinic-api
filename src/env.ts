import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const format_json = (
  status: number,
  success: boolean,
  error: any,
  meta: any,
  message: any,
  data: any,
) => ({
  status: status,
  success: success,
  errors: error,
  meta: meta,
  message: message,
  data: data,
});
