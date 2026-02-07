from bson import ObjectId


def serialize_mongo_document(doc: dict) -> dict:
    doc["id"] = str(doc["_id"])
    del doc["_id"]
    return doc
