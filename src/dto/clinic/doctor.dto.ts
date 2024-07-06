import { IsInt, IsString, IsDate, IsOptional } from 'class-validator';

export class DoctorDto {
  @IsInt()
  id: number;

  @IsString()
  doctor_name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsString()
  address: string;

  @IsString()
  post_code: string;

  @IsInt()
  latitude: number;

  @IsInt()
  longitude: number;

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  experience: string;

  @IsOptional()
  @IsString()
  education: string;

  @IsInt()
  poly_id: number;

  @IsInt()
  wilayah_id: number;

  poly: {
    id: number;
    name: string;
    description: string;
    clinic_id: number;
  };

  wilayah: {
    id: number;
    provinsi: string;
    kabupaten: string;
    kecamatan: string;
    kelurahan: string;
  };
}
