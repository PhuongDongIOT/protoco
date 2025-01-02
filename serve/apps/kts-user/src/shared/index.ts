import { HttpStatus, UnprocessableEntityException } from '@nestjs/common';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { ConfigService } from '@nestjs/config';
import { diskStorage } from 'multer';

export const configMuterUploadSingleFile = (configService: ConfigService) => {
    return {
      fileFilter: (request: any, file: { originalname: string; }, callback: (arg0: UnprocessableEntityException | null, arg1: boolean) => void) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|pdf|gif)$/i)) {
          return callback(
            new UnprocessableEntityException({
              status: HttpStatus.UNPROCESSABLE_ENTITY,
              errors: {
                file: `cantUploadFileType`,
              },
            }),
            false,
          );
        }
  
        callback(null, true);
      },
      storage: diskStorage({
        destination: './assets/files',
        filename: (request, file, callback) => {
          callback(
            null,
            `${randomStringGenerator()}.${file.originalname
              .split('.')
              .pop()
              ?.toLowerCase()}`,
          );
        },
      }),
      limits: {
        fileSize: configService.get('file.maxFileSize', { infer: true }),
      },
    };
  }
  