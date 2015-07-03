using PersonalTools.Data;
using PersonalTools.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PersonalTools.BLL
{
    public class IdentityBLL : BaseBLL<IdentityEntity>
    {
        public IdentityBLL()
            : base("Identities") 
        {
        }

        //public async Task Insert(IdentityEntity)
        //{
        //    await _collection.InsertOneAsync()
        //}

        public void Test()
        {
            this.FindAll();
            //var _collections = DataStore.Instance.Database.GetCollection<IdentityEntity>("Identities");
            //_collections.InsertOneAsync(new IdentityEntity { IdentityId = "asdfasd" });
        }
    }
}
