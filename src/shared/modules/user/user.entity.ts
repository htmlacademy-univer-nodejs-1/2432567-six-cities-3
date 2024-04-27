import { User } from '../../types.js';
import { UserType } from '../../const.js';
import { defaultClasses, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { createSHA256 } from '../../utils/hash.js';
import { CreateUserDto } from './dto/create-user.dto';

export interface UserEntity extends defaultClasses.Base {}

/*
  У каждого документа есть уникальный идентификатор. Он не повторяется и позволяет идентифицировать определённый документ. Мы самостоятельно можем определить соответствующее поле в модели, но поскольку он потребуется для каждого документа, то придётся определять это поле в каждой модели.
  Этого можно избежать, если воспользоваться интерфейсом `Base`. Если просто добавить интерфейс в список `implements`, то придётся добавить в класс поля. Чтобы этого не делать, сделаем интерфейс с тем же именем, что и класс и унаследуем его от `Base`.
  При объявлении интерфейса и класса с одинаковым именем в TypeScript, будет выполнена операция объединения типов (type merging). В результате, и интерфейс, и класс будут содержать объединенные свойства и методы.
  Оба объявления типов будут объединены в один, и результирующий тип будет содержать свойства и методы из обоих объявлений. В данном случае, результирующий тип `UserEntity` будет иметь свойства и методы из интерфейса `UserEntity` и класса `UserEntity`.
*/

@modelOptions({
  schemaOptions: {
    collection: 'users',
    timestamps: true,
  }
})
export class UserEntity extends defaultClasses.TimeStamps implements User {

  @prop({
    required: true,
    minlength: [1, 'Min length for name is 1'],
    maxlength: [15, 'Max length for name is 15'],
    trim: true,
    type: () => String
  })
  public name: string;

  @prop({
    required: true,
    unique: true,
    match: [/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+/, 'Email is incorrect'],
    trim: true,
    type: () => String
  })
  public email: string;

  @prop({
    required: false,
    default: '',
    type: () => String
  })
  public avatarUrl: string;

  @prop({
    required: true,
    minlength: [6, 'Min length for password is 6'],
    maxlength: [12, 'Max length for password is 12'],
    default: '',
    type: () => String
  })
  private password?: string;

  @prop({
    required: true,
    enum: UserType,
    type: () => String
  })
  public userType: UserType;

  constructor(user: CreateUserDto) {
    super();
    this.name = user.name;
    this.email = user.email;
    this.avatarUrl = user.avatarUrl;
    this.userType = user.userType;
  }

  public setPassword(password: string, salt: string): void {
    this.password = createSHA256(password, salt);
  }

  public getPassword(): string | undefined {
    return this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
