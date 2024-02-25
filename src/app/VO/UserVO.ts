export class UserVO {
  userId: number;
  username: string;
  password: string;
  confirmPassword: string;
  role: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  status: string;

  constructor(userId: number = 0, username: string = '', password: string = '', confirmPassword: string = '', role: string = 'trainee', firstName: string = '', lastName: string = '', email: string = '', phoneNumber: string = '', address: string = '', city: string = '', status: string = 'active') {
    this.userId = userId;
    this.username = username;
    this.password = password;
    this.confirmPassword = confirmPassword;
    this.role = role;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.address = address;
    this.city = city;
    this.status = status;
  }
}
