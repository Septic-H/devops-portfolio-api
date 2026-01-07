[![Build Status](https://app.travis-ci.com/Septic-H/devops-portfolio-api.svg?token=NuVMfJXHnnWDLnoMrTAx&branch=main)](https://app.travis-ci.com/Septic-H/devops-portfolio-api)
![Docker](https://img.shields.io/badge/Docker_Compose-v2-blue)
![Monitoring](https://img.shields.io/badge/Prometheus_%26_Grafana-Active-orange)

# DevOps Portfolio API

A production-grade, containerized Node.js application. Deployed securely on a hardened Linux server with a fully automated CI/CD pipeline and real-time observability stack.

**Live URL:** https://huzaifaj.tech/

## Live Monitoring Dashboard
*(Air-gapped Grafana dashboard accessing real-time server metrics via SSH Tunnel)*

![Grafana Dashboard](./dashboard.png)

## Tech Stack
* **Runtime:** Node.js & Express
* **Orchestration:** Docker Compose (v2)
* **Proxy:** Nginx (SSL/TLS via Let's Encrypt)
* **CI/CD:** Travis CI (GitOps workflow)
* **Observability:** Prometheus (Metrics) & Grafana (Visualization)
* **Infrastructure:** DigitalOcean (Hardened Ubuntu VPS)

## Security & Architecture
* **Hardened Access:** Root login disabled. Password auth disabled (SSH Keys only).
* **Air-Gapped Monitoring:** Grafana dashboard is hidden from the public internet (localhost only) and accessed via SSH Tunneling.
* **Stability:** 1GB Swap configured to prevent OOM (Out of Memory) crashes.
* **Zero-Downtime:** Rolling updates via Docker Compose.

## The Pipeline
1.  **Push:** Commit code to `main`.
2.  **Test:** Travis CI runs unit tests.
3.  **Deploy:** Pipeline SSHs into server.
4.  **Update:** Docker Compose rebuilds the app container while keeping monitoring services running.

## Quick Start

### Run Locally (Full Stack)
```bash
# Clone and run everything (App + Prometheus + Grafana)
git clone https://github.com/Septic-H/devops-portfolio-api.git
docker compose up -d --build

# API: http://localhost:3000
# Grafana: http://localhost:3001 (Default: admin/admin)
