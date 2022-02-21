### Run Splunk Docker Container

```
docker run -d -p 8000:8000 -p 8088-8089:8088-8089 -e "SPLUNK_START_ARGS=--accept-license" -e "SPLUNK_PASSWORD=E7NK_6W*m_elWtPd" --name splunk splunk/splunk:latest
```

### Splunk REST API Reference Manual

https://docs.splunk.com/Documentation/Splunk/8.2.5/RESTREF/RESTinput

### Event Collector REST API

https://docs.splunk.com/Documentation/SplunkCloud/8.2.2112/Data/HECRESTendpoints


### Upload Data To Sluck

In order to upload data onto the Splunk first we need to configure the HTTP Event Collector. 
The HTTP Event Collector is the HTTP server 

To configure the HTTP Event Collector navigate to `Settings > Data Inputs > HTTP Event Collector` within the Splunk web application. Choose or create new index that you want to push your data to. Set `Source Type` to `Automatic`.
Once it's done you will see the token, use it to run the script below.

#### Adjust Global Settings

Navigate to `Settings > Data Inputs > HTTP Event Collector` and click **Global Settings** button up top. Select `_json` as **Default Source Type**. Disable **SSL** in case running Splunk in the docker container.

#### splunk-upload 

```
node ./splunk-upload.js --token=<token> --key=vulnerabilities ./data/cisa.json
```

#### Error Messages

**panic: socket hang up** - Disable **SSL** verification for the HTTP Event Collector


### Download CVE List

https://cve.mitre.org/data/downloads/index.html

```
curl -v -H'If-Modified-Since: Sun, 20 Feb 2022 20:36:46 GMT' https://cve.mitre.org/data/downloads/allitems.csv
```

### Forwarding & Receiving

You can forward data from one Splunk Enterprise instance to another Splunk Enterprise instance or even to a non-Splunk system. The Splunk instance that performs the [forwarding](https://docs.splunk.com/Splexicon:Forwarding) is called a [forwarder](https://docs.splunk.com/Splexicon:Forwarder).


