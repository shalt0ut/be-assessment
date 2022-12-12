import { Schema, Document, model } from 'mongoose';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import validator from 'validator';

interface UserSession {
  sessionID: string;
  refTokenVersion: number;
  sessionCreation?: Date;
  lastRefresh?: Date;
}

interface UserAttributes {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm?: string;
  salt: string;
  creationDate: Date;

  responsive?: boolean;

  userSessions: UserSession[];

  activationToken?: string;
  activationTokenExpiry?: Date;

  registrationToken?: string;
  registrationExpiry?: Date;

  resetToken?: string;
  resetTokenExpiry?: Date;

  activated: boolean;
}

interface UserDocument extends UserAttributes, Document {
  _id: string;
  isCorrectPassword: (
    inputPassword: string,
    userPassword: string
  ) => Promise<boolean>;
}

// Validator Function
function confirmPassword(
  this: UserDocument,
  password: UserAttributes['password']
) {
  if (!this.isModified('password')) return true;
  return password === this.passwordConfirm;
}

const userSchema = new Schema<UserDocument>({
  firstName: {
    type: String,
    minlength: [2, 'Name Too Short'],
    maxlength: [40, 'Name Too Long'],
    required: [true, 'Please Enter First Name'],
  },
  lastName: {
    type: String,
    minlength: [2, 'Name Too Short'],
    maxlength: [40, 'Name Too Long'],
    required: [true, 'Please Enter Last Name'],
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: [true, 'Please Enter Email'],
    validate: [validator.isEmail, 'Please Enter a Valid Email'],
  },

  password: {
    type: String,
    minlength: [8, 'Password Too Short'],
    maxlength: [64, 'Password Too Long'],
    select: false,
    required: [true, 'Please Enter a Password'],
    validate: [confirmPassword, 'Cannot Confirm password'],
  },
  passwordConfirm: String,
  salt: {
    type: String,
    select: false,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },

  responsive: Boolean,

  userSessions: [
    {
      sessionID: String,
      refTokenVersion: Number,
      sessionCreation: { type: Date, default: Date.now },
      lastRefresh: Date,
    },
  ],

  activationToken: String,
  activationTokenExpiry: Date,

  registrationToken: String,
  registrationExpiry: Date,

  resetToken: String,
  resetTokenExpiry: Date,

  activated: {
    type: Boolean,
    default: false,
  },
});

// PreSave Hook (note: Does not work for Mongoose Update() or FindOneAndUpdate())
userSchema.pre('save', hashPassword);
userSchema.pre('save', emailChangeVerificationCheck);

// Password Hashing and Updating
async function hashPassword(this: UserDocument, next: any) {
  if (!this.isModified('password')) return next();

  this.salt = crypto.randomBytes(6).toString('hex');
  this.password = await bcrypt.hash(this.password, 12);
  //TODO: Look into Salt not used
  this.passwordConfirm = undefined;

  next();
}

function emailChangeVerificationCheck(this: UserDocument, next: any) {
  if (this.isModified('email')) this.activated = false;

  next();
}

// Utility Password Checker
userSchema.methods.isCorrectPassword = async function (
  inputPassword: string,
  userPassword: string
) {
  return await bcrypt.compare(inputPassword, userPassword);
};

const User = model<UserDocument>('User', userSchema);

export { User, UserDocument, UserAttributes, UserSession };
