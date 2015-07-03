using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PersonalTools.Data
{
    public class DataStore : IDisposable
    {
        private static Lazy<DataStore> _instance;

        protected static IMongoClient _client;
        protected static IMongoDatabase _database;


        private DataStore(string databaseName, MongoDatabaseSettings settings = null)
        {
            _client = new MongoClient();
            _database = _client.GetDatabase(databaseName, settings);

            DatabaseName = databaseName;
        }

        public static DataStore Instance
        {
            get
            {
                if (_instance == null)
                {
                    throw new Exception("Please call method DataStore.Register first.");
                }
                return _instance.Value;
            }
        }

        public string DatabaseName { get; set; }

        public IMongoDatabase Database
        {
            get
            {
                return _database;
            }
        }

        public static void Register(string databaseName, MongoDatabaseSettings settings = null)
        {
            if (_instance != null)
            {
                throw new Exception("Instance has been generated. Please call method DataStore.Instance for using");
            }

            _instance = new Lazy<DataStore>(() => new DataStore(databaseName, settings));
        }

        public void Dispose()
        {
            // Nothing
        }
    }
}
