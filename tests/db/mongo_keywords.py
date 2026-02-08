from pymongo import MongoClient

class MongoKeywords:
    ROBOT_LIBRARY_SCOPE = "GLOBAL"
    
    def connect(self, uri, db_name):
        self.client = MongoClient(uri)
        self.db = self.client[db_name]

    def clear_collection(self, collection):
        self.db[collection].delete_many({})

    def insert_document(self, collection, document):
        self.db[collection].insert_one(document)

    def disconnect(self):
        self.client.close()
