import UserServices from "../services/users.service.js";

export default class UserController {
  static uploadDocuments = async (req) => {
    await UserServices.uploadDocuments(req);
  };

  static upgradeToPremium = async (id) => {
    const user = await UserServices.findBy({ _id: id });
    if(!user) throw new Error("User not found");

    const userDocs = user.documents;
    const filteredDocs = userDocs.filter(doc => doc.reference.includes(`/documents`));
    
    if(filteredDocs.length < 3) throw new Error("You must upload all documents");

    await UserServices.updatePartialBy(id, { $set: { role: 'premium' } });  

  }

  static purchase (user) {
    return UserServices.purchase(user);
  }
}
