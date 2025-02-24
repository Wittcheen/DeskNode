class UserDTO {
    constructor(data) {
        this.id = data.id;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.email = data.email;
        this.accountStatus = data.accountStatus;
    }
}

export { UserDTO };
