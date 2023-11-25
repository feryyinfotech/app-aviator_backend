const Shop = require("../../models/Shaloon/Shopkeeper");
// const fetch = require('node-fetch')


exports.createShopKeeper = async (request, response) => {
  try {
    const {
      f_name,
      l_name,
      address,
      country,
      state,
      city,
      shop_name,
      mobile,
      basic_cost,
      account_number,
      email,
      latitude,
      longitude,
    } = request.body;


    const shop = new Shop({
      f_name,
      l_name,
      address,
      country,
      state,
      city,
      shop_name,
      mobile,
      basic_cost,
      account_number,
      email,
      latitude,
      longitude,
    });


    if(await Shop.findOne({email:email})){
        response.status(201).json({
            message:"This mail already registered",
            status_code:201
        })
        return
    }
    if(await Shop.findOne({mobile:mobile})){
        response.status(201).json({
            message:"Mobile no already exist",
            status_code:201
        })
        return
    }


    const res = await shop.save();

    response.status(200).json({
      status_code: 200,
      success: true,
      message: "Sign up Successfully",
      data: res,
    });
  } catch (e) {
    console.log(e);
    response.status(500).json({
      message: "Internal Server Error",
      error: e,
    });
  }
};



exports.login_Api = async (request, response) => {
  try {
    const {
      mobile,
      email,
      password
    } = request.body;

   
    const mob = await Shop.findOne({mobile:mobile})
    const em = await Shop.findOne({email:email}) 
   

    if(!mob || !em){
        response.status(201).json({
            message:"User doesn't exist"
        })
        return
    }

    const name = await Shop.findOne({email:email})

    if(name.f_name+"@1234" === password){
        response.status(200).json({
            message:"User login successfull",
            shop_id:name._id,
            user:name.f_name,
            email:name.email,
            shop_name:name.shop_name
        })
    }else{
        response.status(200).json({
            message:"Wrong password"
        })
    }

  } catch (e) {
    console.log(e);
    response.status(500).json({
      message: "Internal Server Error",
      error: e,
    });
  }

  // getLatLong("Lucknow Uttar Pradesh")
};





// Function to get latitude and longitude from an address or pincode


const getLatLong = async(addressOrPincode)=>{

  const API_KEY = '66f92cd404b6af789fd18b6e59666cbb';
  console.log(addressOrPincode)
  const formattedAddress = encodeURIComponent(addressOrPincode);

  const geocodeApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${formattedAddress}&key=${API_KEY}`;

  try {
    const response = await fetch(geocodeApiUrl);
    const data = await response.json();

    if (data.status === 'OK' && data.results.length > 0) {
      const location = data.results[0].geometry.location;
      const latitude = location.lat;
      const longitude = location.lng;
      console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    } else {
      console.error('Location not found.');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}


// Update this line:
// const fetch = require('node-fetch');
// To use dynamic import:
import('node-fetch').then(({ default: fetch }) => {
  // Rest of your code that depends on 'fetch'
  const API_KEY = 'c93e71b0ef820c44ed97daaffc04e9ca';

  async function getLatLong(addressOrPincode) {
    const formattedAddress = encodeURIComponent(addressOrPincode);
  
    const geocodeApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${formattedAddress}&key=${API_KEY}`;
  
    try {
      const response = await fetch(geocodeApiUrl);
      // console.log(response)
      const data = await response.json();
  console.log(data);
      if (data.status === 'OK' && data.results.length > 0) {
        const location = data.results[0].geometry.location;
        const latitude = location.lat;
        const longitude = location.lng;
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
      } else {
        console.error('Location not found.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  // Usage example
  // getLatLong('Lucknow 226016'); // Replace with your desired address or pincode
});

