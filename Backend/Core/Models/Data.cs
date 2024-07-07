namespace Core.Models
{
    public class Data
    {
        public IEnumerable<Floor> floors { get; set; }
    }

    public class Floor
    {
        public string FloorId { get; set; }
        public string AuditId { get; set; }
        public string Name { get; set; }
        public IEnumerable<Area> areas { get; set; }
    }

    public class Area
    {
        public string AreaId { get; set; }
        public string FloorId { get; set; }
        public string Name { get; set; }
        public IEnumerable<FireDoor> fireDoor { get; set; }
        public IEnumerable<Risk> risks { get; set; }
    }

    public class FireDoor
    {
        public string FireDoorId { get; set; }
        public string AreaId { get; set; }
        public string Barcode { get; set; }
        public string DoorMaterial { get; set; }
        public string FrameMaterial { get; set; }
        public string Result { get; set; }
    }

    public class Risk
    {
        public string RiskId { get; set; }
        public string AreaId { get; set; }
        public string Observation { get; set; }
        public string Recommendation { get; set; }
        public string Priority { get; set; }
    }
}
