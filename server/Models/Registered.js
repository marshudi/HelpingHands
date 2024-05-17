import mongoose from "mongoose";

const RegisteredSchema = mongoose.Schema({
  package: {
    type: String,

  },
  name: {
    type: String,
    },

  isActive: {
    type: Boolean,
  },
  category: {
    type: String,
 
  },
  price: {
    type: String,
  },
  pic: {
    type: String,

  },

  userid: {
    type: String,

  },


});

const RegisteredModel = mongoose.model("RegisteredProfile", RegisteredSchema,"RegisteredProfile");

export default RegisteredModel;
