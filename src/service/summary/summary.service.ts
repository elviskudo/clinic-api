import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SummaryDto } from 'src/dto/summary/summary.dto';
import { UpdateSummaryDto } from 'src/dto/summary/update.summary.dto';
import { Summary } from 'src/entity/summary/summary.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';
import { DrugService } from '../drug/drug.service';

@Injectable()
export class SummaryService {
  constructor(
    @InjectRepository(Summary)
    private summaryRepository: Repository<Summary>,
    private readonly drugService: DrugService,
  ) {}

  async getappointments(token: string) {
    const extracttoken = jwt.verify(token, process.env.JWT_SECRET);

    if (typeof extracttoken !== 'string' && 'userId' in extracttoken) {
      const userId = extracttoken.userId;
    
      const summary = await this.summaryRepository.find({
        relations: ['poly', 'doctor','profile','doctordata'],
      });

      const summaryresult = await Promise.all(
        summary.map(async (summary) => {
          const drugDetails = await Promise.all(
            summary.drug.map(async (drug) => {
              const drugDetail = await this.drugService.findOne(drug.drug_id);
              return {
                ...drugDetail,
                qty: drug.qty,
              };
            })
          );

          return {
            id: summary.id,
            poly_id: summary.poly_id,
            poly: {
              poly_id: summary.poly_id,
              poly_name: summary.poly.name,
            },
            doctor_id: summary.doctor_id,
            doctor: summary.doctor,
            scheduled_date_time: summary.scheduled_date_time,
            qr_code: summary.qr_code,
            image_captured_checked: summary.image_captured_checked,
            patient_id: summary.patient_id,
            patient: summary.profile,
            approved_by_doctor_id: summary.approved_by_doctor_id,
            approved_by_doctor: summary.doctordata,
            symptoms: summary.symptoms,
            symptoms_description: summary.symptoms_description,
            status: summary.status,
            ai_status: summary.ai_status,
            ai_response: summary.ai_response,
            image_url: summary.image_url,
            ai_token: summary.ai_token,
            drugs: drugDetails,
          };
        })
      );

      if (summary) {
        return {
          status: true,
          message: 'Success',
          data: summaryresult,
        };
      } else {
        return {
          status: false,
          message: 'System Errors',
          data: null,
        };
      }
    } else {
      return {
        status: false,
        message: 'Invalid token',
        data: null,
      };
    }
  }

  async createSummary(token: string,summaryDto: SummaryDto) {
    const extracttoken = jwt.verify(token, process.env.JWT_SECRET);

    if (typeof extracttoken !== 'string' && 'userId' in extracttoken) {
      const userId = extracttoken.userId;

      const { poly_id, doctor_id, scheduled_date_time, qr_code, image_captured_checked, symptoms, symptoms_description, status, ai_status, ai_response, image_url, ai_token, drug } = summaryDto;
      
      let summary = await this.summaryRepository.findOne({
        where: {
          poly_id,
          doctor_id,
          scheduled_date_time,
          qr_code,
        },
        relations: ['poly', 'doctor','profile','doctordata']
      });

      if (summary) {
        summary.poly_id = poly_id ?? summary.poly_id;
        summary.doctor_id = doctor_id ?? summary.doctor_id;
        summary.scheduled_date_time = scheduled_date_time ?? summary.scheduled_date_time;
        summary.qr_code = qr_code ?? summary.qr_code;
        summary.image_captured_checked = image_captured_checked ?? summary.image_captured_checked;
        summary.patient_id = userId;
        summary.symptoms = symptoms ?? summary.symptoms;
        summary.symptoms_description = symptoms_description ?? summary.symptoms_description;
        summary.status = status ?? summary.status;
        summary.ai_status = ai_status ?? summary.ai_status;
        summary.ai_response = ai_response ?? summary.ai_response;
        summary.image_url = image_url ?? summary.image_url;
        summary.ai_token = ai_token ?? summary.ai_token;
        summary.drug = drug ?? summary.drug;

        const update = await this.summaryRepository.save(summary);

        if (update) {

          const drugDetails = await Promise.all(
            update.drug.map(async (drug) => {
              const drugDetail = await this.drugService.findOne(drug.drug_id);
              return {
                ...drugDetail,
                qty: drug.qty,
              };
            })
          );

          const summaryresult = {
            id: update.id,
            poly_id: update.poly_id,
            poly: {
              poly_id: update.poly_id,
              poly_name: update.poly.name,
            },
            doctor_id: update.doctor_id,
            doctor: update.doctor,
            scheduled_date_time: update.scheduled_date_time,
            qr_code: update.qr_code,
            image_captured_checked: update.image_captured_checked,
            patient_id: update.patient_id,
            patient: update.profile,
            approved_by_doctor_id: update.approved_by_doctor_id,
            approved_by_doctor: update.doctordata,
            symptoms: update.symptoms,
            symptoms_description: update.symptoms_description,
            status: update.status,
            ai_status: update.ai_status,
            ai_response: update.ai_response,
            image_url: update.image_url,
            ai_token: update.ai_token,
            drugs: drugDetails,
          };


          return {
            status: true,
            message: 'Success',
            data: summaryresult,
          };
        } else {
          return {
            status: false,
            message: 'System Errors',
            data: null,
          };
        }
      } else {
        let create = this.summaryRepository.create(summaryDto);
        create.patient_id = userId;
        const summary = this.summaryRepository.save(create);
        

        if (create) {
          const poly_id = create.poly_id; 
          const doctor_id = create.doctor_id; 
          const scheduled_date_time = create.scheduled_date_time; 
          const qr_code = create.qr_code; 
          const patient_id = create.patient_id; 
          let getdatacreate = await this.summaryRepository.findOne({
            where: {
              poly_id,
              doctor_id,
              scheduled_date_time,
              qr_code,
              patient_id
            },
            relations: ['poly', 'doctor','profile','doctordata']
          });

          const drugDetails = await Promise.all(
            getdatacreate.drug.map(async (drug) => {
              const drugDetail = await this.drugService.findOne(drug.drug_id);
              return {
                ...drugDetail,
                qty: drug.qty,
              };
            })
          );

          const summaryresult = {
            id: getdatacreate.id,
            poly_id: getdatacreate.poly_id,
            poly: {
              poly_id: getdatacreate.poly_id,
              poly_name: getdatacreate.poly.name,
            },
            doctor_id: getdatacreate.doctor_id,
            doctor: getdatacreate.doctor,
            scheduled_date_time: getdatacreate.scheduled_date_time,
            qr_code: getdatacreate.qr_code,
            image_captured_checked: getdatacreate.image_captured_checked,
            patient_id: getdatacreate.patient_id,
            pacient: getdatacreate.profile,
            approved_by_doctor_id: getdatacreate.approved_by_doctor_id,
            approved_by_doctor: getdatacreate.doctordata,
            symptoms: getdatacreate.symptoms,
            symptoms_description: getdatacreate.symptoms_description,
            status: getdatacreate.status,
            ai_status: getdatacreate.ai_status,
            ai_response: getdatacreate.ai_response,
            image_url: getdatacreate.image_url,
            ai_token: getdatacreate.ai_token,
            drugs: drugDetails,
          };

          return {
            status: true,
            message: 'Success',
            data: summaryresult,
          };
        } else {
          return {
            status: false,
            message: 'System Errors',
            data: null,
          };
        }
      }
    } else {
      return {
        status: false,
        message: 'Invalid token',
        data: null,
      };
    }
  }

  async updateSummary(
    id: number,
    updateSummaryDto: UpdateSummaryDto,
  ): Promise<Summary> {
    await this.summaryRepository.update(id, updateSummaryDto);
    return this.summaryRepository.findOne({ where: { id } });
  }

  async findSummaryById(id: number): Promise<Summary> {
    return this.summaryRepository.findOne({ where: { id } });
  }

  async findAllSummaries(): Promise<Summary[]> {
    return this.summaryRepository.find();
  }

  async removeSummary(id: number): Promise<void> {
    await this.summaryRepository.delete(id);
  }
}
