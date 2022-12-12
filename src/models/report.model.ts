import { Schema, Document, model } from 'mongoose';

import { Check, CheckDocument, CheckAttributes } from '@models/check.model';

interface ReportAttributes {
  _id: string;
  checkId: CheckAttributes['_id'] | CheckDocument;
  status: string;
  availability: number;
  outages: number;
  downtime: number;
  uptime: number;
  responseTime: number;
  history: [Date];
}

interface ReportDocument extends ReportAttributes, Document {
  _id: string;
}

const ReportSchema = new Schema<ReportDocument>({
  checkId: {
    type: Schema.Types.ObjectId,
    ref: Check.modelName,
  },
  status: String,
  availability: Number,
  outages: Number,
  downtime: Number,
  uptime: Number,
  responseTime: String,
  history: [Date],
});

const Report = model<ReportDocument>('Report', ReportSchema);
export { Report, ReportDocument, ReportAttributes };
