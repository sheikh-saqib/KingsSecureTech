using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Models
{
    public class Audits
    {
        public string AuditId { get; set; }
        public DateTime? AuditDate { get; set; }
        public string AuditCompanyId { get; set; }
        public string PropertyId { get; set; }
        public string Status { get; set; }
        public string AssessmentTypeId { get; set; }
        public DateTime? CompletedDate { get; set; }
    }
}
