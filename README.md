# TypeScript REST API Application with AKS

A repository with a simple REST API application written in TypeScript and deployed to Azure Kubernetes Service (AKS) using Terraform and GitHub Actions for CI/CD.

## 🚀 Resources Used

- **[Visual Studio Code](https://code.visualstudio.com/?WT.mc_id=javascript-97470-gllemos)**
- **[TypeScript](https://www.typescriptlang.org/)**
- **[Node.js 18.x](https://nodejs.org/en/)**
- **[Azure Free Account](https://azure.microsoft.com/?WT.mc_id=javascript-97470-gllemos)**
- **[Azure Kubernetes Service](https://learn.microsoft.com/en-us/azure/aks/)**
- **[Terraform](https://www.hashicorp.com/products/terraform)**
- **[GitHub Packages](https://github.com/features/packages)**
- **[GitHub Actions](https://github.com/features/actions)**
- Some Visual Studio Code Extensions:
  - **[Azure Tools Extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-node-azure-pack&WT.mc_id=javascript-97470-gllemos)**
  - **[TypeScript Extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-next&WT.mc_id=javascript-97470-gllemos)**
  - **[ESLint Extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint&WT.mc_id=javascript-97470-gllemos)**
  - **[REST Client Extension](https://marketplace.visualstudio.com/items?itemName=humao.rest-client&WT.mc_id=javascript-97470-gllemos)**
  - **[Remote Containers Extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)**

## 🔥 How to run the application locally?

We are using Docker to run the application locally. For that, run the following commands below:

```bash
docker compose up -d
```

And to see if the container is running, run the following command below:

```bash
docker ps
```

Now, in the root of the project, you will notice that there is a folder called: `rest-client`. Inside this folder, there is a file called: `employees.http`. This file is an HTTP request file that can be executed directly in Visual Studio Code. To execute this file, just click on the button: `Send Request` that is located in the upper right corner of the file. For testing purposes, create some employee records. And then, test the other HTTP requests.

To stop the container, run the following command below:

```bash
docker compose down -- volumes
```

## About the Application

* SOLID Concepts
* Clean Architecture
* Using MongoDB as Database
* Using Docker and Docker Compose
* Using GitHub Packages as Docker Registry

## ❓ Questions? Comments? 

If you have any questions about the code developed, feel free to open an **[ISSUE HERE](https://github.com/glaucia86/api-rest-ts-aks/issues)**. We'll get back to you soon!
