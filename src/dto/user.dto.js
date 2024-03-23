export default class UserDto {
  constructor(user) {
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.role = user.role;
    this.email = user.email;
    this.documents = user.documents;
    this.age = user.age;
  }
}
