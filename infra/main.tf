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

resource "azurerm_kubernetes_cluster" "api_ts_aks_resource" {
  name                = "api-ts-aks"
  location            = azurerm_resource_group.api_ts_aks_rg.location
  resource_group_name = azurerm_resource_group.api_ts_aks_rg.name
  dns_prefix          = "api-aks"

  default_node_pool {
    name       = "default"
    node_count = 3
    vm_size    = "Standard_DS2_v2"
    zones      = [1, 2, 3]
  }

  identity {
    type = "SystemAssigned"
  }
}