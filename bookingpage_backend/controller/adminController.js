import Admin from "../model/adminModel.js";

export const createAdmin = async (req, res) => {
  try {
    const adminData = new Admin(req.body);
    const { email } = adminData;

    const emailExist = await Admin.findOne({ email });
    if (emailExist) {
      return res.status(400).json({ message: "email alredy exist." });
    }
    const saveAdmin = await adminData.save();
    res.status(200).json(saveAdmin);
  } catch (error) {
    res.status(500).json({ error: "internel server error" });
  }
};




export const fetchAdmin = async (req, res) => {
  try {
    const email = await Admin.find();
    if (!email) {
      return res.status(404).json({ message: "email not found" });
    }
    res.status(200).json(email);
  } catch (error) {
    res.status(500).json({ error: "internel server error" });
  }
};



 export const updateAdmin =async(req,res)=>{
    try{
        const id =req.params.id;
        const emailExist = await Admin.findOne({_id:id});
        if(!emailExist){
            return res.status(404).json({message: "admin not found"});
        }
        const updateAdmin =await Admin.findByIdAndUpdate(id,req.body,{new:true})
        res.status(201).json(updateAdmin)

    } catch(error){
        res.status(500).json({error: "internel server error" });

    }
 };







 export const deleteAdmin =async(req,res)=>{
    try{
        const id =req.params.id;
        const emailExist = await Admin.findById({_id:id});
        if(!emailExist){
            return res.status(404).json({message: "admin not found"});
        }
        await Admin.findByIdAndDelete(id);
        res.status(201).json({message:"admin deleated successfully"})

    } catch(error){
        res.status(500).json({error: "internel server error" });

    }
 };
 

