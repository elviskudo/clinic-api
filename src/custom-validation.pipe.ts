import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { ValidationPipe, ValidationError } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { format_json } from './env'; // Make sure the import path is correct

@Injectable()
export class CustomValidationPipe extends ValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    if (!metadata.metatype || !this.isToValidate(metadata.metatype)) {
      return value;
    }

    const object = plainToInstance(metadata.metatype, value);
    const errors = await validate(object);

    if (errors.length > 0) {
      const formattedErrors = this.formatErrors(errors);
      throw new BadRequestException(
        format_json(400, false, formattedErrors, null, 'Validation failed', null),
      );
    }

    return value;
  }

  private isToValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }

  private formatErrors(errors: ValidationError[]) {
    return errors.map(err => ({
      property: err.property,
      messages: Object.values(err.constraints || {}),
      children: this.formatErrors(err.children || []),
    }));
  }
}
