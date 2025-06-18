using AplicacionWev.Model;
using Microsoft.EntityFrameworkCore;

namespace AplicacionWev.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Producto> Productos { get; set; }
        public DbSet<StockMon> StockMon { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Producto>()
                .HasIndex(p => p.Codigo)
                .IsUnique();

            modelBuilder.Entity<Producto>()
                .Property(p => p.CreatedAt)
                .HasConversion(
                    v => v.ToUniversalTime(), 
                    v => DateTime.SpecifyKind(v, DateTimeKind.Utc));

            modelBuilder.Entity<Producto>()
                .Property(p => p.UpdatedAt)
                .HasConversion(
                    v => v.ToUniversalTime(), 
                    v => DateTime.SpecifyKind(v, DateTimeKind.Utc));
        }
        public DbSet<Usuario> Usuarios { get; set; }
    }
}
