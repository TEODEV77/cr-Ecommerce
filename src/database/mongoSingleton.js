import mongoose from "mongoose";
import { getLogger } from "../utils/logger.js";
import { environment } from "../env.js";
import { DatabaseConnected, DatabaseError } from "../utils/messages.js";

export default class MongoSingleton {
  static logger = getLogger();

  constructor() {
    const { URI } = environment.mongo;
    
    const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://TEODEV77:7voaQze1lb9szWPK@test.tkegg6l.mongodb.net/ecommerce-dp?retryWrites=true&w=majority';

    try {
        this.connection = mongoose.connect(MONGO_URI);
        DatabaseConnected();
    } catch (error) {
        DatabaseError(error);
    }
  }

  static getInstance() {
    if (!MongoSingleton.instance) {
      MongoSingleton.instance = new MongoSingleton();
    }
    return MongoSingleton.instance;
  }
}
