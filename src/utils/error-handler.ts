import { BadRequestException } from '@nestjs/common';
export const errorHandlers = (error) => {
  if (error.code === 11000) {
    throw new BadRequestException({
      message: 'dubplicate',
      key: error.keyValue,
    });
  }

  throw new BadRequestException(error);
};

interface ErrorType {
  message: string;
  key: string;
}
