from pymongo import MongoClient
from variables.env import MONGO_URI, DB_NAME

class MongoKeywords:
    ROBOT_LIBRARY_SCOPE = "GLOBAL"
    
    def connect(self):
        self.client = MongoClient(MONGO_URI)
        self.db = self.client[DB_NAME]

    def get_document(self, collection, query):
        return self.db[collection].find_one(query)
    
    def insert_document(self, collection, document):
        self.db[collection].insert_one(document)

    def delete_document(self, collection, query):
        self.db[collection].delete_one(query)

    def disconnect(self):
        self.client.close()
        