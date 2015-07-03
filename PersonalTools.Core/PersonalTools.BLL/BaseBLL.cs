using MongoDB.Bson;
using MongoDB.Driver;
using PersonalTools.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PersonalTools.BLL
{
    public class BaseBLL<T> where T: new()
    {
        protected IMongoDatabase _database;
        protected IMongoCollection<T> _collection;

        public BaseBLL(string collectionName)
        {
            _database = DataStore.Instance.Database;
            _collection = _database.GetCollection<T>(collectionName);
        }

        public async virtual Task FindAll()
        {
            var documents = await _collection.Find(new BsonDocument()).ToListAsync();

        }

        //public virtual FindById(string id)
        //{
            
        //    var filter = Builders<T>.Filter.Eq("_id","");
        //    return _collection.FindAsync();
        //}

        public async virtual Task Insert(T entity) 
        {
            await _collection.InsertOneAsync(entity);
        }

        public async virtual Task Update(T entity)
        {
            //await _collection.UpdateOneAsync();
        }

        public async virtual Task Delete(T entity)
        {
            //await _collection.DeleteOneAsync();
        }
    }
}
