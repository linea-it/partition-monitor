# Partition Monitor

This tool has the purpose of monitoring the servers partitions.

---

## Installation

**1. Clone the repository**

```shell
git clone https://github.com/linea-it/partition-monitor.git
cd partition-monitor
cp .env.template .env
```

**2. Configuring the Partition Monitor API**

Modify `REACT_APP_API_URL key` in `.env` to a valid Partition Monitor API url <a href="https://github.com/linea-it/#" target="_blank">(see Partition Monitor API)</a>


**3. Running**

- If you're going to run in a development environment, use:
```shell
yarn install
yarn start
```
> Running at URL: http://localhost:3000

- Or by docker using docker-compose:

```shell
cp docker-compose.yml.template docker-compose.yml
docker-compose up
```
> Running at URL: http://localhost/partition-monitor

---

## Release History

* v1.0.0
  * INIT: First version.

