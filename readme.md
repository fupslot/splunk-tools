## Run Slunk & Webhook 

```
docker-compose up -d
```

Webhook endpoint: http://webhook:4000

## Step 1. Adjust Global Settings

Navigate to `Settings > Data Inputs > HTTP Event Collector` and click **Global Settings** button up top. Select `_json` as **Default Source Type**. 

**Disable SSL** in case running Splunk in the docker container


## Step 2. Create HTTP Event Collector

First step is to upload the data onto the Splunk. In order to do that we need to configure the HTTP Event Collector. 
With the HTTP Event Collector we can pass the events using HTTP POST requests.

To configure the HTTP Event Collector navigate to `Settings > Data Inputs > HTTP Event Collector` within the Splunk web application. Choose or create new index that you want to push your data to. Set `Source Type` to `Automatic`.
Once it's done you will see the token, use it to run the script below.

## Step 3. Upload Data

Use HTTP Event Collector token

**CISA Dataset**
```
node ./splunk-upload.js --token=<token> --key=vulnerabilities ./data/cisa.json
```

**Pokemon Dataset**
```
node ./splunk-upload.js --token=<token> ./data/pokemons.json
```

## Step 4. Create Alert

In progress...

## References

1. Splunk REST API Reference Manual - https://docs.splunk.com/Documentation/Splunk/8.2.5/RESTREF/RESTinput

2. Event Collector REST API - https://docs.splunk.com/Documentation/SplunkCloud/8.2.2112/Data/HECRESTendpoints

3. Download CVE List - https://cve.mitre.org/data/downloads/index.html

**Download CVE List**

```
curl -v -H'If-Modified-Since: Sun, 20 Feb 2022 20:36:46 GMT' https://cve.mitre.org/data/downloads/allitems.csv
```