using MongoDB.Bson;
using MongoDB.Driver;
using Newtonsoft.Json;
using PersonalTools.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PersonalTools.BLL
{
    public class BaseBLL<T> where T : IEntity
    {
        protected IMongoDatabase _database;
        protected IMongoCollection<T> _collection;

        public BaseBLL(string collectionName)
        {
            _database = DataStore.Instance.Database;
            _collection = _database.GetCollection<T>(collectionName);
        }

        public async virtual Task<List<T>> FindAll()
        {
            return await _collection.Find(new BsonDocument()).ToListAsync();
        }

        public async virtual Task<T> FindById(string id)
        {
            return await _collection.Find(Builders<T>.Filter.Eq(it => it.Id, id)).SingleOrDefaultAsync();
        }

        public async virtual Task Insert(T entity)
        {
            await _collection.InsertOneAsync(entity);
        }

        public async virtual Task Update(T entity)
        {
            await _collection.ReplaceOneAsync(Builders<T>.Filter.Eq(it => it.Id, entity.Id), entity);
        }

        public async virtual Task Delete(string id)
        {
            await _collection.DeleteOneAsync(Builders<T>.Filter.Eq(it => it.Id, id));
        }
    }
}
