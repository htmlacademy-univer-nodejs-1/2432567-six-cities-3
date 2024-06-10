import { User } from '../../types.js';
import { defaultClasses, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { createSHA256 } from '../../utils/hash.js';

export interface UserEntity extends defaultClasses.Base {}

/*
  У каждого документа есть уникальный идентификатор. Он не повторяется и позволяет идентифицировать определённый документ. Мы самостоятельно можем определить соответствующее поле в модели, но поскольку он потребуется для каждого документа, то придётся определять это поле в каждой модели.
  Этого можно избежать, если воспользоваться интерфейсом `Base`. Если просто добавить интерфейс в список `implements`, то придётся добавить в класс поля. Чтобы этого не делать, сделаем интерфейс с тем же именем, что и класс и унаследуем его от `Base`.
  При объявлении интерфейса и класса с одинаковым именем в TypeScript, будет выполнена операция объединения типов (types merging). В результате, и интерфейс, и класс будут содержать объединенные свойства и методы.
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
  public avatarPath: string;

  @prop({
    required: true,
    default: '',
    type: () => String
  })
  private password?: string;

  @prop({
    required: true,
    default: false,
    type: () => Boolean
  })
  public isPro: boolean;

  constructor(user: User) {
    super();
    this.name = user.name;
    this.email = user.email;
    this.avatarPath = user.avatarPath;
    this.isPro = user.isPro;
  }

  public setPassword(password: string, salt: string): void {
    this.password = createSHA256(password, salt);
  }

  public getPassword(): string | undefined {
    return this.password;
  }

  public verifyPassword(password: string, salt: string) {
    const hashPassword = createSHA256(password, salt);
    return hashPassword === this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
