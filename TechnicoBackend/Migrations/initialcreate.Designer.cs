﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using TechnicoBackend.Data;

#nullable disable

namespace TechnicoBackend.Migrations
{
    [DbContext(typeof(TechnicoDbContext))]
    [Migration("20241112141521_initialcreate")]
    partial class initialcreate
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.10")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("TechnicoBackend.Models.PropertyItem", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Address")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("IdentificationNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("YearOfConstruction")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("PropertyItems");
                });

            modelBuilder.Entity("TechnicoBackend.Models.PropertyOwner", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Address")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Surname")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("VATNumber")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("PropertyOwners");
                });

            modelBuilder.Entity("TechnicoBackend.Models.PropertyOwnerPropertyItem", b =>
                {
                    b.Property<int>("PropertyOwnerId")
                        .HasColumnType("int");

                    b.Property<int>("PropertyItemId")
                        .HasColumnType("int");

                    b.HasKey("PropertyOwnerId", "PropertyItemId");

                    b.HasIndex("PropertyItemId");

                    b.ToTable("PropertyOwnerPropertyItems");
                });

            modelBuilder.Entity("TechnicoBackend.Models.Repair", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Address")
                        .HasColumnType("nvarchar(max)");

                    b.Property<decimal>("Cost")
                        .HasColumnType("decimal(18,2)");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("PropertyItemId")
                        .HasColumnType("int");

                    b.Property<DateTime>("ScheduledDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TypeOfRepair")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("PropertyItemId");

                    b.ToTable("Repairs");
                });

            modelBuilder.Entity("TechnicoBackend.Models.PropertyOwnerPropertyItem", b =>
                {
                    b.HasOne("TechnicoBackend.Models.PropertyItem", "PropertyItem")
                        .WithMany("PropertyOwnerPropertyItems")
                        .HasForeignKey("PropertyItemId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("TechnicoBackend.Models.PropertyOwner", "PropertyOwner")
                        .WithMany("PropertyOwnerPropertyItems")
                        .HasForeignKey("PropertyOwnerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("PropertyItem");

                    b.Navigation("PropertyOwner");
                });

            modelBuilder.Entity("TechnicoBackend.Models.Repair", b =>
                {
                    b.HasOne("TechnicoBackend.Models.PropertyItem", "PropertyItem")
                        .WithMany("Repairs")
                        .HasForeignKey("PropertyItemId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("PropertyItem");
                });

            modelBuilder.Entity("TechnicoBackend.Models.PropertyItem", b =>
                {
                    b.Navigation("PropertyOwnerPropertyItems");

                    b.Navigation("Repairs");
                });

            modelBuilder.Entity("TechnicoBackend.Models.PropertyOwner", b =>
                {
                    b.Navigation("PropertyOwnerPropertyItems");
                });
#pragma warning restore 612, 618
        }
    }
}