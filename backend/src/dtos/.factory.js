import { UserDTO } from './user.dto.js';

const DTO_TYPES = Object.freeze({
    USER: UserDTO
});

class DTOFactory {
    // # marks the function as private
    static #create(dtoClass, data) {
        if (typeof dtoClass !== "function" || !data || typeof data !== "object") {
            return null;
        }
        return new dtoClass(data);
    }

    static create(dtoClass, data) {
        return dtoClass ? this.#create(dtoClass, data) : null;
    }
}

export { DTO_TYPES, DTOFactory };
