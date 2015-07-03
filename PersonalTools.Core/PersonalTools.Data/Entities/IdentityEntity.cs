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

        public string ThirdPartyLoginName { get; set; }

        public string ThirdPartyPassword { get; set; }

        public string ThirdPartyTradePassword { get; set; }
    }
}
