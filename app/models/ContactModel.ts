import mongoose ,{Schema, Document} from "mongoose";

interface Contact extends Document {
  name: string;
  email: string;
  mobile: string;
  message: string;
}

const contactSchema = new Schema<Contact>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  message: { type: String, required: true },
});

const contactModel = mongoose.models.Contact || mongoose.model("Contact", contactSchema);

export default contactModel;
