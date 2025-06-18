using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AplicacionWev.Model
{
    public class StockMon
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        public Guid ProductoId { get; set; }

        [Required]
        [StringLength(100)]
        public string ProductoName { get; set; } = string.Empty;

        [Required]
        public string Type { get; set; } = string.Empty;

        [Required]
        public int Cantidad { get; set; }

        [Required]
        [Column(TypeName = "date")]
        public DateTime Fecha { get; set; }

        [StringLength(100)]
        public string Motivo { get; set; }

        [StringLength(800)]
        public string Comentarios { get; set; }

        public DateTime Timestamp { get; set; } = DateTime.UtcNow;

    }
}
