const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require('cors');
const connect = require("./config/database")

const bodyParser = require("body-parser");
const PORT = process.env.PORT || 5001;
app.use(express.json());
app.use(cors());
app.use(cors({ origin: ["http://localhost:3000"], credentials: true }));

connect.then(() => {
    console.log("Successfully connected to database");
  })
  .catch((err) => {
    console.log("error");
    process.exit(1);
  });

// Define a schema for form data
const formDataSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    education: String,
    skills: String,
    workPlace: String,
    hobbies: String,
  });
  
  // Create a model based on the schema
  const FormData = mongoose.model('FormData', formDataSchema);
  
 
  app.post('/submit-form', async (req, res) => {
    try {
      const formData = new FormData(req.body);
      await formData.save();
      console.log('Form submitted:', formData);
      res.status(200).json({ message: 'Form submitted successfully' });
    } catch (error) {
      console.error('Error submitting form:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

 
app.get('/get-form-data', async (req, res) => {
    try {
      const formDataList = await FormData.find();
      res.status(200).json(formDataList);
      console.log(formDataList)
    } catch (error) {
      console.error('Error fetching form data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


app.delete('/delete-form', async (req, res) => {
    try {
        console.log('req.body.id', req.body.id)
        const deletedFormData = await FormData.findByIdAndDelete(req.body.id);
        if (!deletedFormData) {
          return res.status(404).json({ message: 'Form not found' });
        }
        res.json({ message: 'form deleted successfully' });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    });


  
app.listen(PORT, ()=>{
    console.log(`Server is running on this ${PORT}`)
});