const userBusinessModel = require("../models/userBusiness");

exports.createUserBusiness = async (userId, businessId, role) => {
    try {
        console.log("id business");
        console.log(businessId);
        // Check if a UserBusiness record already exists for this user and business
        const existingUserBusiness = await userBusinessModel.findOne({ userId, businessId });

        if (existingUserBusiness) {
            // Update the existing record
            existingUserBusiness.role = role;
            await existingUserBusiness.save();
        } else {
            const newUserBusiness = new userBusinessModel({
                userId,
                businessId,
                role
            });
            await newUserBusiness.save();
        }
    } catch (error) {
        console.error(error);
    }
}