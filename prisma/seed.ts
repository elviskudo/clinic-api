import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const managerpassword = await bcrypt.hash('Manager123@', 10);
  const doctorpassword = await bcrypt.hash('Doctor123@', 10);
  const operatorpassword = await bcrypt.hash('Operator123@', 10);
  const patientpassword = await bcrypt.hash('Patient@123', 10);
  const adminpassword = await bcrypt.hash('Tastas123@', 10);

  const adminrole = await prisma.role.create({
    data: {
      name: 'Admin',
    },
  });

  const manajerrole = await prisma.role.create({
    data: {
      name: 'Manajer',
    },
  });

  const doctorrole = await prisma.role.create({
    data: {
      name: 'Doctor',
    },
  });

  const operatorrole = await prisma.role.create({
    data: {
      name: 'Operator',
    },
  });

  const patientrole = await prisma.role.create({
    data: {
      name: 'Patient',
    },
  });

  const manajer = await prisma.user.create({
    data: {
      email: 'manager@gmail.com',
      password: managerpassword,
      role_id: manajerrole.id,
      verifed: 1,
    },
  });

  const doctor = await prisma.user.create({
    data: {
      email: 'doctor@gmail.com',
      password: doctorpassword,
      role_id: doctorrole.id,
      verifed: 1,
    },
  });

  const operator = await prisma.user.create({
    data: {
      email: 'operator@gmail.com',
      password: operatorpassword,
      role_id: operatorrole.id,
      verifed: 1,
    },
  });

  const patient = await prisma.user.create({
    data: {
      email: 'patient@gmail.com',
      password: patientpassword,
      role_id: patientrole.id,
      verifed: 1,
    },
  });

  const admin = await prisma.user.create({
    data: {
      email: 'taztaz@gmail.com',
      password: adminpassword,
      role_id: adminrole.id,
      verifed: 1,
    },
  });

  await prisma.profile.create({
    data: {
      fullname: 'Manager',
      phone_number: '1234567890',
      user_id: manajer.id,
      profil_image: 'https://api.dicebear.com/8.x/notionists/svg?seed=' + 'Manager',
      no_identity: null,
      birth_date: null,
      birth_place: null,
      address: null,
      gender: null,
      work_in: null,
      blood_type: null,
      marital_status: null,
      nationality: null,
      religion: null,
      city_id: null,
      neighborhood_no: null,
      citizen_no: null,
      area_code: null,
      responsibleForCosts: null,
    },
  });

  await prisma.profile.create({
    data: {
      fullname: 'Doctor',
      phone_number: '1234567891',
      user_id: doctor.id,
      profil_image: 'https://api.dicebear.com/8.x/notionists/svg?seed=' + 'Doctor',
      no_identity: null,
      birth_date: null,
      birth_place: null,
      address: null,
      gender: null,
      work_in: null,
      blood_type: null,
      marital_status: null,
      nationality: null,
      religion: null,
      city_id: null,
      neighborhood_no: null,
      citizen_no: null,
      area_code: null,
      responsibleForCosts: null,
    },
  });

  await prisma.profile.create({
    data: {
      fullname: 'Operator',
      phone_number: '1234567892',
      user_id: operator.id,
      profil_image: 'https://api.dicebear.com/8.x/notionists/svg?seed=' + 'Operator',
      no_identity: null,
      birth_date: null,
      birth_place: null,
      address: null,
      gender: null,
      work_in: null,
      blood_type: null,
      marital_status: null,
      nationality: null,
      religion: null,
      city_id: null,
      neighborhood_no: null,
      citizen_no: null,
      area_code: null,
      responsibleForCosts: null,
    },
  });

  await prisma.profile.create({
    data: {
      fullname: 'Patient',
      phone_number: '1234567893',
      user_id: patient.id,
      profil_image: 'https://api.dicebear.com/8.x/notionists/svg?seed=' + 'Patient',
      no_identity: null,
      birth_date: null,
      birth_place: null,
      address: null,
      gender: null,
      work_in: null,
      blood_type: null,
      marital_status: null,
      nationality: null,
      religion: null,
      city_id: null,
      neighborhood_no: null,
      citizen_no: null,
      area_code: null,
      responsibleForCosts: null,
    },
  });

  await prisma.profile.create({
    data: {
      fullname: 'Admin',
      phone_number: '1234567894',
      user_id: admin.id,
      profil_image: 'https://api.dicebear.com/8.x/notionists/svg?seed=' + 'Admin',
      no_identity: null,
      birth_date: null,
      birth_place: null,
      address: null,
      gender: null,
      work_in: null,
      blood_type: null,
      marital_status: null,
      nationality: null,
      religion: null,
      city_id: null,
      neighborhood_no: null,
      citizen_no: null,
      area_code: null,
      responsibleForCosts: null,
    },
  });
}

main()
  .then(() => {
    console.log('Seeding finished.');
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
