## Run Slunk & Webhook 

```
docker-compose up -d
```

Webhook URL: http://webhook:4000

## Step 1. Adjust Global Settings

Navigate to `Settings > Data Inputs > HTTP Event Collector` and click **Global Settings** button up top. Select `_json` as **Default Source Type**. 

**Disable SSL** in case running Splunk in the docker container


## Step 2. Create HTTP Event Collector

First step is to upload the data onto the Splunk. In order to do that we need to configure the HTTP Event Collector. 
With the HTTP Event Collector we can pass the events using HTTP POST requests.

To configure the HTTP Event Collector navigate to `Settings > Data Inputs > HTTP Event Collector` within the Splunk web application. Choose or create new index that you want to push your data to. Set `Source Type` to `Automatic`.
Once it's done you will see the token, use it to run the script below.

## Step 3. Create Alert

First, navigate to `Settings > Searches, Reports and Alerts > New Alert` 

1. Title: `Legendary Pokemon (Attack 150+)`
2. Search: `index="pokemons" Attack >= 150 Legendary="TRUE"`
3. App: `Search & Reporting`
4. Alert Type: `Real-time`
5. Throttle: `Off`
6. Trigger Alert When: `Per-Result`
7. Trigger Actions: `Add Actions > Webhook > http://webhook:4000`

To see and modify the allert navigate to `Apps > Search & Reporting > Alerts`

## Step 4. Verify Output

In order to verify that Splunk streams alerts back to the webhook we need to attach to its stdout by running following command.

```
docker-compose logs -f webhook
```

## Step 5. Upload Data

Push data into Splunk using HTTP Event Collector

**CISA Dataset**
```
node ./splunk-upload.js --token=<token> --key=vulnerabilities ./data/cisa.json
```

**Pokemon Dataset**
```
node ./splunk-upload.js --token=<token> ./data/pokemons.json
```

## References

1. Splunk REST API Reference Manual - https://docs.splunk.com/Documentation/Splunk/8.2.5/RESTREF/RESTinput

2. Event Collector REST API - https://docs.splunk.com/Documentation/SplunkCloud/8.2.2112/Data/HECRESTendpoints

3. Custom Workflow Action Examples - https://dev.splunk.com/enterprise/docs/devtools/customworkflowactions/customworkflowactionexamples/

4. Download CVE List - https://cve.mitre.org/data/downloads/index.html

5. Search Reference - https://docs.splunk.com/Documentation/SplunkCloud/8.2.2112/SearchReference/Search


**Download CVE List**

```
curl -v -H'If-Modified-Since: Sun, 20 Feb 2022 20:36:46 GMT' https://cve.mitre.org/data/downloads/allitems.csv
```