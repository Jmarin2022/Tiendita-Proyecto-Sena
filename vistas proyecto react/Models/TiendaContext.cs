using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace vistas_proyecto_react.Models;

public partial class TiendaContext : DbContext
{
    public TiendaContext()
    {
    }

    public TiendaContext(DbContextOptions<TiendaContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Categoria> Categorias { get; set; }

    public virtual DbSet<Cliente> Clientes { get; set; }

    public virtual DbSet<DetalleVenta> DetalleVentas { get; set; }

    public virtual DbSet<Entradum> Entrada { get; set; }

    public virtual DbSet<Imagen> Imagens { get; set; }

    public virtual DbSet<Permiso> Permisos { get; set; }

    public virtual DbSet<Rol> Rols { get; set; }

    public virtual DbSet<RolesPermiso> RolesPermisos { get; set; }

    public virtual DbSet<Usuario> Usuarios { get; set; }

    public virtual DbSet<Ventum> Venta { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=(local);Database=tiendaapi; Trusted_Connection=True;TrustServerCertificate=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Categoria>(entity =>
        {
            entity.HasKey(e => e.IdCategoria).HasName("PK__Categori__CB9033495297886A");

            entity.Property(e => e.IdCategoria).HasColumnName("Id_Categoria");
            entity.Property(e => e.Estado)
                .HasMaxLength(1)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.IdImagen).HasColumnName("Id_Imagen");
            entity.Property(e => e.NombreC)
                .HasMaxLength(50)
                .IsUnicode(false);

            entity.HasOne(d => d.IdImagenNavigation).WithMany(p => p.CategoriaNavigation)
                .HasForeignKey(d => d.IdImagen)
                .HasConstraintName("FK__Categoria__Id_Im__5FB337D6");
        });

        modelBuilder.Entity<Cliente>(entity =>
        {
            entity.HasKey(e => e.IdCliente).HasName("PK__Cliente__378C7054C281004F");

            entity.ToTable("Cliente");

            entity.Property(e => e.IdCliente).HasColumnName("id_Cliente");
            entity.Property(e => e.Apellido)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("apellido");
            entity.Property(e => e.Celular)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("celular");
            entity.Property(e => e.Direccion)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("direccion");
            entity.Property(e => e.Estado)
                .HasMaxLength(10)
                .IsUnicode(false)
                .IsFixedLength()
                .HasColumnName("estado");
            entity.Property(e => e.FechaRegistro)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("fecha_registro");
            entity.Property(e => e.Nombre)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("nombre");
        });

        modelBuilder.Entity<DetalleVenta>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__detalle___3213E83F840C0252");

            entity.ToTable("detalle_ventas");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Cantidad).HasColumnName("cantidad");
            entity.Property(e => e.ProductoId).HasColumnName("producto_id");
            entity.Property(e => e.Total).HasColumnName("total");
            entity.Property(e => e.VentaId).HasColumnName("venta_id");

            entity.HasOne(d => d.Venta).WithMany(p => p.DetalleVenta)
                .HasForeignKey(d => d.VentaId)
                .HasConstraintName("FK__detalle_v__venta__60A75C0F");
        });

        modelBuilder.Entity<Entradum>(entity =>
        {
            entity.HasKey(e => e.IdEntrada).HasName("PK__Entrada__19943CE09008DFC5");

            entity.Property(e => e.IdEntrada).HasColumnName("idEntrada");
            entity.Property(e => e.Cantidad).HasColumnName("cantidad");
            entity.Property(e => e.Fecha)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("date");
            entity.Property(e => e.IdProductos).HasColumnName("idProductos");
            entity.Property(e => e.Proveedor)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.HasOne(d => d.Producto).WithMany(p => p.Entradas)
                .HasForeignKey(d => d.IdProductos)
                .HasConstraintName("FK_Entrada_Imagen");
        });

        modelBuilder.Entity<Imagen>(entity =>
        {
            entity.HasKey(e => e.IdImagen).HasName("PK__Imagen__B87925F6788D845B");

            entity.ToTable("Imagen");

            entity.Property(e => e.IdImagen).HasColumnName("Id_Imagen");
            entity.Property(e => e.Categoria)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Descripcion)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Imagen1)
                .IsUnicode(false)
                .HasColumnName("Imagen");
            entity.Property(e => e.Nombre)
                .HasMaxLength(100)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Permiso>(entity =>
        {
            entity.HasKey(e => e.IdPermisos).HasName("PK__Permiso__F115A0894A88F881");

            entity.ToTable("Permiso");

            entity.Property(e => e.IdPermisos).HasColumnName("id_permisos");
            entity.Property(e => e.Crear)
                .HasMaxLength(2)
                .IsUnicode(false);
            entity.Property(e => e.Editar)
                .HasMaxLength(2)
                .IsUnicode(false);
            entity.Property(e => e.Eliminar)
                .HasMaxLength(2)
                .IsUnicode(false);
            entity.Property(e => e.Modulo)
                .HasMaxLength(50)
                .IsUnicode(false);
        });



        modelBuilder.Entity<Rol>(entity =>
        {
            entity.HasKey(e => e.IdRol).HasName("PK__Rol__76482FD28DC80734");

            entity.ToTable("Rol");

            entity.Property(e => e.IdRol).HasColumnName("id_Rol");
            entity.Property(e => e.Fecha).HasColumnType("datetime");
            entity.Property(e => e.Rol1)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("Rol");
        });

        modelBuilder.Entity<RolesPermiso>(entity =>
        {
            entity.HasKey(e => e.IdRolPermisos).HasName("PK__Roles_pe__C48C7EB29AFD951A");

            entity.ToTable("Roles_permisos");

            entity.Property(e => e.IdRolPermisos).HasColumnName("Id_rol_permisos");
            entity.Property(e => e.IdPermisos).HasColumnName("Id_permisos");
            entity.Property(e => e.IdRol).HasColumnName("Id_rol");

            entity.HasOne(d => d.IdPermisosNavigation).WithMany(p => p.RolesPermisos)
                .HasForeignKey(d => d.IdPermisos)
                .HasConstraintName("FK_Roles_permisos_Permisos");

            entity.HasOne(d => d.IdRolNavigation).WithMany(p => p.RolesPermisos)
                .HasForeignKey(d => d.IdRol)
                .HasConstraintName("FK_Roles_permisos_Rol");
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Usuario__3213E83F0619949B");

            entity.ToTable("Usuario");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Contrasena)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("contraseña");
            entity.Property(e => e.Rol).HasColumnName("rol");
            entity.Property(e => e.Usuario1)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("usuario");

            entity.HasOne(d => d.RolNavigation).WithMany(p => p.Usuarios)
                .HasForeignKey(d => d.Rol)
                .HasConstraintName("FK_Usuario_Rol");
        });

        modelBuilder.Entity<Ventum>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Venta__3213E83FC236F1B6");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Cliente)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("cliente");
            entity.Property(e => e.Fechaventa).HasColumnType("datetime");
            entity.Property(e => e.Total).HasColumnName("total");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
