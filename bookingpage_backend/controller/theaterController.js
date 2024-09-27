import Theater from "../model/theaterModel.js";

export const createTheater = async (req, res) => {
  try {
    const theaterData = new Theater(req.body);
    const { theaterName } = theaterData;
    
    const theaterExist = await Theater.findOne({ theaterName });
    if (theaterExist) {

      return res.status(400).json({ message: "theater alredy exist." });

    }
    const savedTheater = await theaterData.save();
    res.status(200).json(savedTheater);
  } catch (error) {
    res.status(500).json({ error: "internel server error" });
  }
};




export const fetchTheater = async (req, res) => {
  try {
    const theater = await Theater.find();
    if (!theater) {
      return res.status(404).json({ message: "theater not found" });
    }
    res.status(200).json(theater);
  } catch (error) {
    res.status(500).json({ error: "internel server error" });
  }
};



 export const updateTheater =async(req,res)=>{
    try{
        const id =req.params.id;
        const theaterExist = await Theater.findOne({_id:id});
        if(!theaterExist){
            return res.status(404).json({message: "theater not found"});
        }
        const updateTheater =await Theater .findByIdAndUpdate(id,req.body,{new:true})
        res.status(201).json(updateTheater)

    } catch(error){
        res.status(500).json({error: "internel server error" });

    }
 };







 export const deleteTheater =async(req,res)=>{
    try{
        const id =req.params.id;
        const theaterExist = await Theater.findById({_id:id});
        if(!theaterExist){
            return res.status(404).json({message: "theater not found"});
        }
        await Theater.findByIdAndDelete(id);
        res.status(201).json({message:"theater deleated successfully"})

    } catch(error){
        res.status(500).json({error: "internel server error" });

    }
 };
 

