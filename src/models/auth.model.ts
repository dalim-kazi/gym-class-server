import mongoose, { Schema, Document, Model } from 'mongoose';
import bcrypt from 'bcrypt';

// Define the User interface for TypeScript
export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  role: 'admin' | 'trainer' | 'trainee';
  comparePassword(password: string): Promise<boolean>;
}

// Define the User schema
const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['admin', 'trainer', 'trainee'],
      default: 'trainee',
    },
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

// Export the User model
const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);
export default User;
