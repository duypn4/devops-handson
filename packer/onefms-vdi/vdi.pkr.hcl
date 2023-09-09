packer {
  required_plugins {
    amazon = {
      version = ">= 0.0.2"
      source  = "github.com/hashicorp/amazon"
    }
  }
}

locals {
    timestamp = regex_replace(timestamp(), "[- TZ:]", "")
}

source "amazon-ebs" "ubuntu" {
  ami_name      = "onefms-vdi-${local.timestamp}"
  instance_type = "t2.micro"
  region        = "ap-southeast-1"
  vpc_filter {
    filters = {
      "tag:Name": "network-non-prod-ase1-vpc-001"
    }
  }
  subnet_filter {
    filters = {
      "tag:Name": "network-non-prod-public-ase1-subnet-1a-bastion"
    }
  }
  source_ami_filter {
    filters = {
      name                = "ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-20230208"
      root-device-type    = "ebs"
      virtualization-type = "hvm"
    }
    most_recent = true
    owners      = ["amazon"]
  }
  ssh_username = "ubuntu"
}

build {
  sources = [
    "source.amazon-ebs.ubuntu"
  ]

  provisioner "shell" {
    script = "./install.sh"
  }
}