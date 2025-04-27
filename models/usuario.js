import { Schema, model } from 'mongoose';

const UserSchema = Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    state: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

UserSchema.methods.toJSON = function() {
    const { __v, password, _id, ...user } = this.toObject(); // Convertir el objeto a un objeto plano y eliminar el campo password y __v
    user.uid = _id; // Cambiar el nombre del campo _id a uid
    return user; // Retornar el objeto sin el campo password y __v
}

export const User = model('User', UserSchema);