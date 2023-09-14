variable "resource_group_name" {
  type = string
  description = "Name of the resource group"
}

variable "location" {
  type = string
  description = "Location of the resource group"
}

variable "cluster_name" {
  type = string
  description = "Name of the AKS cluster"
}

variable "kubernetes_version" {
  type = string
  description = "Version of Kubernetes"
}

variable "system_node_count" {
  type = number
  description = "Number of system nodes"
}

variable "ghcr_name" {
  type = string
  description = "Name of the GitHub Container Registry"
}