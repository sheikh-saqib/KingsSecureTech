using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;
using System.Text.Json.Serialization;

namespace Core.Models
{
    public class Risks
    {
        [Required]
        public string RiskId { get; set; }

        [Required]
        public string AreaId { get; set; }

        public string Observation { get; set; }

        public string Recommendation { get; set; }

        [Required]
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public PriorityLevel Priority { get; set; }
    }

    public enum PriorityLevel
    {
        [EnumMember(Value = "1")]
        VeryHigh = 1,
        [EnumMember(Value = "2")]
        High = 2,
        [EnumMember(Value = "3")]
        Medium = 3,
        [EnumMember(Value = "4")]
        Low = 4
    }

    public class RisksDTO
    {
        public string RiskId { get; set; }
        public string AreaId { get; set; }
        public string Observation { get; set; }
        public string Recommendation { get; set; }

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public PriorityLevel Priority { get; set; }
        public string FloorId { get; set; }
        public string AuditId { get; set; }
        public string PropertyId { get; set; }
        public string ClientId { get; set; }

    }

}
