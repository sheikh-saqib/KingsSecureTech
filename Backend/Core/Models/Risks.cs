using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Core.Models
{
    public class Risks
    {
        [Required]
        public string RiskId { get; set; }

        [Required]
        public string AreaId { get; set; }

        [Required]
        public string Observation { get; set; }

        [Required]
        public string Recommendation { get; set; }

        [Required]
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public PriorityLevel Priority { get; set; }
    }

    public enum PriorityLevel
    {
        VeryHigh,
        High,
        Medium,
        Low
    }
}