terraform {
  required_version = ">= 1.1.7, < 2.0.0"
  required_providers {
    azurerm = {
      source = "hashicorp/azurerm"
      version = "~>3.47.0"
    }
  }
}

provider "azurerm" {
  features {}
}