"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const managerpassword = yield bcrypt.hash('Manager123@', 10);
        const doctorpassword = yield bcrypt.hash('Doctor123@', 10);
        const operatorpassword = yield bcrypt.hash('Operator123@', 10);
        const patientpassword = yield bcrypt.hash('Patient@123', 10);
        const adminpassword = yield bcrypt.hash('Tastas123@', 10);
        const adminrole = yield prisma.role.create({
            data: {
                name: 'Admin',
            },
        });
        const manajerrole = yield prisma.role.create({
            data: {
                name: 'Manajer',
            },
        });
        const doctorrole = yield prisma.role.create({
            data: {
                name: 'Doctor',
            },
        });
        const operatorrole = yield prisma.role.create({
            data: {
                name: 'Operator',
            },
        });
        const patientrole = yield prisma.role.create({
            data: {
                name: 'Patient',
            },
        });
        const manajer = yield prisma.user.create({
            data: {
                email: 'manager@gmail.com',
                password: managerpassword,
                role_id: manajerrole.id,
                verifed: 1,
            },
        });
        const doctor = yield prisma.user.create({
            data: {
                email: 'doctor@gmail.com',
                password: doctorpassword,
                role_id: doctorrole.id,
                verifed: 1,
            },
        });
        const operator = yield prisma.user.create({
            data: {
                email: 'operator@gmail.com',
                password: operatorpassword,
                role_id: operatorrole.id,
                verifed: 1,
            },
        });
        const patient = yield prisma.user.create({
            data: {
                email: 'patient@gmail.com',
                password: patientpassword,
                role_id: patientrole.id,
                verifed: 1,
            },
        });
        const admin = yield prisma.user.create({
            data: {
                email: 'taztaz@gmail.com',
                password: adminpassword,
                role_id: adminrole.id,
                verifed: 1,
            },
        });
        yield prisma.profile.create({
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
        yield prisma.profile.create({
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
        yield prisma.profile.create({
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
        yield prisma.profile.create({
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
        yield prisma.profile.create({
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
        yield prisma.configuration.create({
            data: {
                application_name: 'Clinic Ai',
                application_version: '1.0.3',
                application_content: 'Clinic Ai',
                application_teams: 'Clinic Ai',
                by_email: 'email',
                by_email_username: 'by_email_username',
                by_email_password: 'by_email_password',
                to_email: 'to_email',
                by_whatsapp: 'by_whatsapp',
                by_whatsapp_secret: 'by_whatsapp_secret',
                by_telegram: 'by_telegram',
                by_telegram_secret: 'by_telegram_secret',
            }
        });
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
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
//# sourceMappingURL=seed.js.map