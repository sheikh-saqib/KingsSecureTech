﻿using System;
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
}
