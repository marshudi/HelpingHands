import mongoose from "mongoose";

const ServiceSchema = mongoose.Schema({
  category: {
    type: String,

  },
  name: {
    type: String,
  },
  desc: {
    type: String,
 
  },
  price: {
    type: Number,
  },
  pic: {
    type: String,

  },

});

const ServiceModel = mongoose.model("ServiceProfile", ServiceSchema,"ServiceProfile");

export default ServiceModel;
