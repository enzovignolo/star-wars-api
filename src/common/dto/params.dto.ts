import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class ObjectIdParam {
  @ApiProperty({ type: String })
  @IsString()
  @IsMongoId()
  id: Types.ObjectId;
}
