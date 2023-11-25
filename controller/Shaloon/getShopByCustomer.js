const ShaCustomer = require('../../models/Shaloon/ShaCustomer')
const Shop = require('../../models/Shaloon/Shopkeeper')


exports.signupCustomer = async(request,response)=>{

    try{
        const {
            name,
            mobile,
            address,
            country,
            state,
            city,
            latitude,
            longitude
        } = request.body;
       
        if(await ShaCustomer.findOne({mobile:mobile})){
            response.status(201).json({
                message:"Mobile no already exist",
                status_code:201
            })
            return
        }
        const shaCustomer = new ShaCustomer({
            name,
            mobile,
            address,
            country,
            state,
            city,
            latitude,
            longitude
        })

        const res = shaCustomer.save();

        if(!res){
           return response.status(201).json({
                message:"Something went wrong from the databse",
                status_code:201
            })
        }
        return response.status(200).json({
            message:"Signup Successfully",
            status_code:200
        })

    }catch(e){
        response.status(500).json({
            message:"Something went wrong",
            status_code:500
        })

    }
}



exports.login_Customer = async (request, response) => {
    try {
      const {
        mobile,
        password
      } = request.body;
  
     
      const mob = await ShaCustomer.findOne({mobile:mobile})
     
  
      if(!mob){
          response.status(201).json({
              message:"User doesn't exist"
          })
          return
      }

    const f_name = mob.name.split(" ")[0];
      if(f_name+"@1234" === password){
          response.status(200).json({
              message:"User login successfull",
              customer_id:mob._id,
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


exports.getnearByShops = async(request,response)=>{

    try{
       const {latitude,longitude} = request.body;

       const radius = 1.0; // For example, 0.1 degrees is approximately 11 kilometers

       // Calculate the range of latitude and longitude values
       const minLatitude = parseFloat(latitude) - radius;
       const maxLatitude = parseFloat(latitude) + radius;
       const minLongitude = parseFloat(longitude) - radius;
       const maxLongitude = parseFloat(longitude) + radius;
     
       // Find locations within the specified range
       console.log({
        latitude: { $gte: minLatitude, $lte: maxLatitude },
        longitude: { $gte: minLongitude, $lte: maxLongitude },
      })
       const res = await Shop.find({
        latitude: { $gte: minLatitude, $lte: maxLatitude },
        longitude: { $gte: minLongitude, $lte: maxLongitude },
       });

      if(!res){
        return response.status(201).json({
            message:"No shop present near by this location",
            status_code:201
        })
      }

    return response.status(200).json({
        message:"Near by shops",
        status_code:200,
        data:{
            data:res
        }
    })
    }catch(e){
   console.log(e,"catch")
    }
}