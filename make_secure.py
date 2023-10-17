from pymongo import MongoClient

# MongoDB connection URI
uri = "mongodb://localhost:27017"  # Replace with your URI

# Database and collection names
source_db_name = "test"  # Replace with your source DB name
source_collection_name = "schedule"  # Replace with your source collection name
destination_db_name = "test"  # Replace with your destination DB name
destination_collection_name = "sec_events"  # Replace with your destination collection name

def main():
    client = MongoClient(uri)

    try:
        source_db = client[source_db_name]
        source_collection = source_db[source_collection_name]

        destination_db = client[destination_db_name]
        destination_collection = destination_db[destination_collection_name]

        # Retrieve data from source collection
        results = source_collection.find({})

        # Process and insert into destination collection
        transformed_data = [{"start": item["start"], "end": item["end"]} for item in results]

        destination_collection.insert_many(transformed_data)
        print("Data inserted into destination collection")
    finally:
        client.close()

if __name__ == "__main__":
    main()
