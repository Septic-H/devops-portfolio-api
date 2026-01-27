[![Build Status](https://app.travis-ci.com/Septic-H/devops-portfolio.svg?token=NuVMfJXHnnWDLnoMrTAx&branch=main)](https://app.travis-ci.com/Septic-H/devops-portfolio)
![Docker](https://img.shields.io/badge/Docker_Compose-v2-blue)
![Monitoring](https://img.shields.io/badge/Prometheus_%26_Grafana-Active-orange)

# DevOps Portfolio: Microservices & IaC

A production-grade, distributed web application built with a **Microservices Architecture**. The application is decoupled into independent frontend and backend services, orchestrated via Docker, and deployed securely on a hardened Linux server.

**Live URL:** https://huzaifaj.tech/

## Live Monitoring Dashboard
*(Air-gapped Grafana dashboard accessing real-time server metrics via SSH Tunnel)*

![Grafana Dashboard](./dashboard.png)

## Architecture Overview

This project implements the **Reverse Proxy Pattern** to route traffic between isolated containers:

```mermaid
graph LR
    User((User)) --> NginxHost[Host Nginx Gateway]
    
    subgraph "Docker Network"
        NginxHost -->|/| Frontend[Frontend Service :8080]
        NginxHost -->|/api/| Backend[Backend Service :3000]
        
        Prometheus[Prometheus] -->|Scrape| Backend
        Prometheus -->|Scrape| NodeExporter[Node Exporter]
    end
```
* Service A (Frontend): Lightweight Nginx container serving static assets (HTML/CSS/JS).

* Service B (Backend): Node.js/Express API handling business logic and health checks.

* Gateway: Host-level Nginx acting as a Layer 7 Reverse Proxy to terminate SSL and route traffic.

## Tech Stack
* **Runtime:** Node.js & Express
* **Orchestration:** Docker Compose (v2)
* **Proxy:** Nginx (SSL/TLS via Let's Encrypt)
* **CI/CD:** Travis CI (GitOps workflow)
* **Observability:** Prometheus (Metrics) & Grafana (Visualization)
* **Security:** Fail2Ban (IPS), UFW Firewall, SSH Hardening
* **Automation:** Cron, Logrotate, Certbot (SSL)
* **Infrastructure:** DigitalOcean Droplet (Ubuntu 24.04 LTS)

## Infrastructure as Code (IaC) & Automation
Host configuration is version-controlled in the infrastructure/ directory and applied via symlinks to ensure a consistent environment.
* **Automated Security:** Configured via `fail2ban-jail.local` to ban IPs after 3 failed SSH attempts and block bots scanning for vulnerabilities.
* **Maintenance Lifecycle:** Automated SSL certificate renewals and weekly Docker garbage collection managed via `crontab.cron`.
* **Resource Management:** Custom log rotation policies enforce strict 10MB limits on Nginx and Fail2Ban logs.
* **Air-Gapped Monitoring:** Grafana dashboard is hidden from the public internet (localhost only) and accessed via SSH Tunneling.
* **Zero-Downtime:** Rolling updates via Docker Compose.

## The Pipeline
1.  **Push:** Commit code to `main`.
2.  **Build:** Travis CI builds independent images for `services/frontend` and `services/backend`.
3.  **Test:** Unit tests run specifically against the Backend API logic.
4.  **Deploy:** Pipeline SSHs into the server, fetches changes, and rebuilds containers using `--remove-orphans` to clean up old microservices.

## Quick Start

### Run Locally (Full Stack)
```bash
# Clone and run everything (App + Prometheus + Grafana)
git clone https://github.com/Septic-H/devops-portfolio.git
docker compose up -d --build

# API: http://localhost:3000
# Grafana: http://localhost:3001 (Default: admin/admin)
```

### Directory Structure
```bash
├── infrastructure/    # Server Configs (IaC)
│   ├── nginx-gateway.conf
│   ├── fail2ban-jail.local
│   ├── crontab.cron
│   └── logrotate/
├── services/
│   ├── frontend/      # Nginx Container (Static Site)
│   └── backend/       # Node.js Container (API)
├── docker-compose.yml
└── .travis.yml
```