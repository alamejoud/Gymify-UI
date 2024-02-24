export class UserVO {
  _userId: number = 0;
  _userName: string;
  _password: string;
  _confirmPassword: string;
  _role: string = 'trainee';
  _firstName: string;
  _lastName: string;
  _email: string;
  _phoneNumber: string;
  _address: string;
  _city: string;
  _status: string = 'active';

  constructor(userId: number, userName: string, password: string, confirmPassword: string, role: string, firstName: string, lastName: string, email: string, phoneNumber: string, address: string, city: string, status: string) {
    this._userId = userId;
    this._userName = userName;
    this._password = password;
    this._confirmPassword = confirmPassword;
    this._role = role;
    this._firstName = firstName;
    this._lastName = lastName;
    this._email = email;
    this._phoneNumber = phoneNumber;
    this._address = address;
    this._city = city;
    this._status = status;
  }

  get userId(): number {
    return this._userId;
  }

  set userId(userId: number) {
    this._userId = userId;
  }

  get userName(): string {
    return this._userName;
  }

  set userName(userName: string) {
    this._userName = userName;
  }

  get password(): string {
    return this._password;
  }

  set password(password: string) {
    this._password = password;
  }

  get confirmPassword(): string {
    return this._confirmPassword;
  }

  set confirmPassword(confirmPassword: string) {
    this._confirmPassword = confirmPassword;
  }

  get role(): string {
    return this._role;
  }

  set role(role: string) {
    this._role = role;
  }

  get firstName(): string {
    return this._firstName;
  }

  set firstName(firstName: string) {
    this._firstName = firstName;
  }

  get lastName(): string {
    return this._lastName;
  }

  set lastName(lastName: string) {
    this._lastName = lastName;
  }

  get email(): string {
    return this._email;
  }

  set email(email: string) {
    this._email = email;
  }

  get phoneNumber(): string {
    return this._phoneNumber;
  }

  set phoneNumber(phoneNumber: string) {
    this._phoneNumber = phoneNumber;
  }

  get address(): string {
    return this._address;
  }

  set address(address: string) {
    this._address = address;
  }

  get city(): string {
    return this._city;
  }

  set city(city: string) {
    this._city = city;
  }

  get status(): string {
    return this._status;
  }

  set status(status: string) {
    this._status = status;
  }

}
