provider "aws" {
  region = var.aws_region
}

# Create a VPC
resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
}

# Create a Subnet
resource "aws_subnet" "public" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.1.0/24"
  availability_zone = "${var.aws_region}a"
}

# Create an EKS cluster
# (Requires IAM roles and other configs, keeping it simple for now)
# module "eks" {
#   source          = "terraform-aws-modules/eks/aws"
#   cluster_name    = "civix-cluster"
#   cluster_version = "1.27"
#   subnet_ids      = [aws_subnet.public.id]
#   vpc_id          = aws_vpc.main.id
# }
