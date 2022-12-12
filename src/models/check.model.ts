import { Schema, Document, model } from 'mongoose';
import slugify from 'slugify';
import { User, UserAttributes, UserDocument } from '@models/user.model';

enum protocol {
  HTTP = 'HTTP',
  HTTPS = 'HTTPS',
  TCP = 'TCP',
}

interface CheckAttributes {
  _id: string;
  slug: string;
  userId: UserAttributes['_id'] | UserDocument;
  name: string;
  url: string;
  protocol: protocol;
  path: string;
  port: number;
  webhook?: string;
  timeout: number;
  interval: number;
  threshold: number;
  authentication: {
    username: string;
    password: string;
  };
  httpHeaders: {};
  assert: {
    statusCode: number;
  };
  tags: string[];
  ignoreSSL: boolean;
  disabled: boolean;
}

interface CheckDocument extends CheckAttributes, Document {
  _id: string;
}

const CheckSchema = new Schema<CheckDocument>({
  slug: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
    required: [true, 'Please Enter Check Name'],
  },
  userId: {
    type: String,
    required: [true, 'Please Enter Creator ID'],
  },
  url: {
    type: String,
    required: [true, 'Please Enter URL'],
  },
  protocol: {
    type: String,
    enum: protocol,
    default: protocol.HTTP,
    required: true,
  },
  path: String,
  port: Number,
  webhook: String,
  timeout: {
    type: Number,
    default: 5,
  },
  interval: {
    type: Number,
    default: 10,
  },
  threshold: {
    type: Number,
    default: 1,
  },
  authentication: {
    username: String,
    password: String,
  },
  httpHeaders: {},
  assert: {
    statusCode: Number,
  },
  tags: [String],
  ignoreSSL: Boolean,
  disabled: Boolean,
});

CheckSchema.pre('save', generateSlug);

async function generateSlug(this: CheckDocument, next: any) {
  if (!this.isNew) return next();
  this.slug = slugify(this.name, { lower: true });
  next();
}

const Check = model<CheckDocument>('Check', CheckSchema);
export { Check, CheckDocument, CheckAttributes };
