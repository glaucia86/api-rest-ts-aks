terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "=3.14.0"
    }
  }
}

provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "api_ts_aks_rg" {
  name     = "devsquad-api-aks"
  location = "West US 2"
}