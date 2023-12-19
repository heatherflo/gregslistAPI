import { Schema } from "mongoose"


export const HouseSchema = new Schema({
  bedrooms: { type: Number, min: 1, required: true },
  bathrooms: { type: Number, min: 1, required: true },
  year: { type: Number, min: 1900, required: true },
  price: { type: Number, min: 50000, required: true },
  imgUrl: { type: String, required: false },
  description: { type: String, required: true, minlength: 10, maxlength: 5000 },
},
  { timestamps: true },
)