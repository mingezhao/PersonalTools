using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.IdGenerators;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PersonalTools.Data.Entities
{
    public class IdentityEntity
    {
        [BsonId(IdGenerator = typeof(StringObjectIdGenerator))]
        public string Id { get; set; }

        public string ThirdPartyName { get; set; }

        public string LoginName { get; set; }

        public string Password { get; set; }

        public string TradePassword { get; set; }

        public string Website { get; set; }

        public string Comments { get; set; }
    }
}
