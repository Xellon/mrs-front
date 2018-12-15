using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MrsFront.Model
{
    public enum UserTypeEnum
    {
        Client = 1,
        Admin,
        Finance
    }

    public class UserType
    {
        public int Id { get; set; }
        public string Type { get; set; }
    }
}
