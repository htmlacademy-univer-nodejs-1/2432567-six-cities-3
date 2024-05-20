import { Expose } from 'class-transformer';

export class UploadImageRDO {
  @Expose()
  public image: string;
}
