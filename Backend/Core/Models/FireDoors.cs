using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Models
{
    public class FireDoors
    {
        [Required]
        public string FireDoorId { get; set; }
        [Required]
        public string AreaId { get; set; }
        public string Barcode { get; set; }
        public string DoorMaterial { get; set; }
        public string FrameMaterial { get; set; }
        public string Result { get; set; }
    }
    public class FireDoorDTO
    {
        public string FireDoorId { get; set; }
        public string AreaId { get; set; }
        public string Barcode { get; set; }
        public string DoorMaterial { get; set; }
        public string FrameMaterial { get; set; }
        public string Result { get; set; }
        public string FloorId { get; set; }
        public string AuditId { get; set; }
        public string PropertyId { get; set; }
        public string ClientId { get; set; }

    }
}
