resource "azurerm_resource_group" "API-TS-AKS-POC" {
  name     = var.resource_group_name
  location = var.location
}

resource "azurerm_kubernetes_cluster" "api-ts-aks-demo" {
  name                = var.cluster_name
  kubernetes_version  = var.kubernetes_version
  location            = var.location
  resource_group_name = azurerm_resource_group.api-ts-aks-demo-rg.name
  dns_prefix          = var.cluster_name

  default_node_pool {
    name                = "default"
    node_count          = var.system_node_count
    vm_size             = "Standard_D2as_v4"
    type                = "VirtualMachineScaleSets"
    enable_auto_scaling = true
  }

  identity {
    type = "SystemAssigned"
  }

  network_profile {
    load_balancer_sku = "standard"
    network_plugin    = "kubenet" 
  }

  tags = {
    Environment = "Development"
  }
}