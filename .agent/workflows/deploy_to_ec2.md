---
description: How to deploy the Next.js app to AWS EC2 using GitHub Actions
---

# Deploy to AWS EC2 Guide

This guide explains how to set up your AWS EC2 instance and GitHub repository to automate deployments using the workflow file created in `.github/workflows/deploy.yml`.

## 1. Launch an EC2 Instance

1.  Log in to the [AWS Management Console](https://console.aws.amazon.com/).
2.  Navigate to **EC2** and click **Launch Instances**.
3.  **Name**: `DineHub-Server`
4.  **AMI**: Choose **Ubuntu Server 24.04 LTS** (or 22.04).
5.  **Instance Type**: `t2.micro` (Free tier eligible) or `t3.small` (recommended for Next.js builds if building on server). `t2.micro` is fine since we build on GitHub Actions.
6.  **Key Pair**: Create a new key pair (type **RSA**, format **.pem**). **Download it and keep it safe**.
7.  **Network Settings**: Allow SSH traffic from Anywhere (0.0.0.0/0) or My IP. Allow HTTP/HTTPS traffic.
8.  Launch the instance.

## 2. Configure Security Group

1.  Go to your instance's **Security Group**.
2.  Edit **Inbound rules**.
3.  Add a rule:
    *   **Type**: Custom TCP
    *   **Port range**: `3000` (Since Next.js runs on 3000 by default)
    *   **Source**: Anywhere (`0.0.0.0/0`)
4.  (Optional but recommended) Map port 80 to 3000 later using Nginx for a production setup. For now, we will test on port 3000.

## 3. Set up the EC2 Instance

Connect to your instance using SSH (replace `your-key.pem` and `public-ip`):
```bash
ssh -i "path/to/your-key.pem" ubuntu@<your-ec2-public-ip>
```

Run the following commands on the server to install Node.js and PM2:

```bash
# Update packages
sudo apt update && sudo apt upgrade -y

# Install Node.js (Version 20)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node -v
npm -v

# Install PM2 globally (Process Manager)
sudo npm install -g pm2
```

## 4. Configure GitHub Repository Secrets

1.  Go to your GitHub Repository -> **Settings** -> **Secrets and variables** -> **Actions**.
2.  Click **New repository secret**.
3.  Add the following secrets:

| Name | Value |
|------|-------|
| `EC2_HOST` | The Public IPv4 address of your EC2 instance. |
| `EC2_USERNAME` | `ubuntu` (Default for Ubuntu AMIs). |
| `EC2_PRIVATE_KEY` | Open your `.pem` key file in a text editor. Copy the **entire** content (including `-----BEGIN RSA PRIVATE KEY-----`) and paste it here. |

## 5. Deploy

1.  Push your changes to the `main` branch.
2.  Go to the **Actions** tab in GitHub.
3.  You should see the "Deploy to EC2" workflow running.

## 6. Verification

Once the workflow completes, open your browser and visit:
`http://<your-ec2-public-ip>:3000`

## (Optional) Setup Nginx for Port 80

To access the app without `:3000`, set up Nginx:

```bash
sudo apt install nginx -y
```

Edit config:
```bash
sudo nano /etc/nginx/sites-available/default
```

Replace `location /` content with:
```nginx
location / {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
}
```

Restart Nginx:
```bash
sudo systemctl restart nginx
```
Now you can visit `http://<your-ec2-public-ip>` directly.
